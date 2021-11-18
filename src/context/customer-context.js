import React from "react";
import { client } from "../utils/client";
import { navigate } from "gatsby-link";

const defaultCustomerContext = {
  customer: undefined,
  orders: [],
};

const CustomerContext = React.createContext(defaultCustomerContext);
export default CustomerContext;

const ACTIONS = {
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  CLEAR_CUSTOMER: "CLEAR_CUSTOMER",
  UPDATE_ORDERS: "UPDATE_ORDERS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case ACTIONS.CLEAR_CUSTOMER:
      return {
        ...state,
        customer: undefined,
      };
    case ACTIONS.UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      break;
  }
};

export const CustomerProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultCustomerContext);
  const [loading, setLoading] = React.useState(true);

  const updateCustomer = (customer) => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: customer });
  };

  const clearCustomer = () => {
    dispatch({ type: ACTIONS.CLEAR_CUSTOMER });
  };

  const createCustomer = async (payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers
      .create(payload)
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const loginCustomer = async (payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.auth
      .authenticate(payload)
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const updateCustomerDetails = async (payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers
      .update(payload)
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const updateBillingAddress = async (payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers
      .update({ billing_address: payload })
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const updateShippingAddress = async (id, payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers.addresses
      .updateAddress(id, { address: payload })
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const addShippingAddress = async (payload) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers.addresses
      .addAddress({ address: payload })
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const deleteShippingAddress = async (id) => {
    const response = { customer: undefined, error: undefined };

    response.customer = await client.customers.addresses
      .deleteAddress(id)
      .then(({ data: { customer } }) => customer)
      .catch((err) => {
        response.error = err.response.data;
      });

    if (!response.error) {
      updateCustomer(response.customer);
    }

    return response;
  };

  const me = React.useCallback(async () => {
    const customer = await client.customers
      .retrieve()
      .then(({ data: { customer } }) => customer)
      .catch((_) => undefined);

    if (customer) {
      updateCustomer(customer);
      await fetchOrders();
      setLoading(false);
      return true;
    }

    clearCustomer();
    setLoading(false);
    return false;
  }, []);

  const logoutCustomer = async () => {
    await client.auth.deleteSession();
    navigate("/");
    clearCustomer();
  };

  const fetchOrders = async () => {
    const orders = await client.customers
      .listOrders()
      .then(({ data: { orders } }) => orders)
      .catch((_) => []);
    dispatch({ type: ACTIONS.UPDATE_ORDERS, payload: orders });
  };

  React.useEffect(() => {
    me();
  }, [me]);

  return (
    <CustomerContext.Provider
      {...props}
      value={{
        ...state,
        loading,
        actions: {
          createCustomer,
          loginCustomer,
          logoutCustomer,
          addShippingAddress,
          updateCustomerDetails,
          updateShippingAddress,
          deleteShippingAddress,
          updateBillingAddress,
        },
      }}
    />
  );
};
