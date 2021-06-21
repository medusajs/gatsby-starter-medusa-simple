import React, { useReducer, useEffect, useRef } from "react";
import Medusa from "../services/medusa";

export const defaultStoreContext = {
  adding: false,
  cart: {
    items: [],
  },
  order: {},
  products: [],
  currencyCode: "eur",
  /**
   *
   * @param {*} variantId
   * @param {*} quantity
   * @returns
   */
  addVariantToCart: () => {},
  createCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  setShippingMethod: () => {},
  updateAddress: () => {},
  createPaymentSession: () => {},
  completeCart: () => {},
  retrieveOrder: () => {},
  dispatch: () => {},
};

const StoreContext = React.createContext(defaultStoreContext);
export default StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "setCart":
      return {
        ...state,
        cart: action.payload,
        currencyCode: action.payload.region.currency_code,
      };
    case "setOrder":
      return {
        ...state,
        order: action.payload,
      };
    case "setProducts":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStoreContext);
  const stateCartId = useRef();

  useEffect(() => {
    stateCartId.current = state.cart.id;
  }, [state.cart]);

  useEffect(() => {
    let cartId;
    if (localStorage) {
      cartId = localStorage.getItem("cart_id");
    }

    if (cartId) {
      Medusa.cart.retrieve(cartId).then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
      });
    } else {
      Medusa.cart.create(cartId).then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
        if (localStorage) {
          localStorage.setItem("cart_id", data.cart.id);
        }
      });
    }

    Medusa.products.list().then(({ data }) => {
      dispatch({ type: "setProducts", payload: data.products });
    });
  }, []);

  const createCart = () => {
    if (localStorage) {
      localStorage.removeItem("cart_id");
    }
    Medusa.cart.create().then(({ data }) => {
      dispatch({ type: "setCart", payload: data.cart });
    });
  };

  const addVariantToCart = async ({ variantId, quantity }) => {
    Medusa.cart.lineItems
      .create(state.cart.id, {
        variant_id: variantId,
        quantity: quantity,
      })
      .then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
      });
  };

  const removeLineItem = async (lineId) => {
    Medusa.cart.lineItems.delete(state.cart.id, lineId).then(({ data }) => {
      dispatch({ type: "setCart", payload: data.cart });
    });
  };

  const updateLineItem = async ({ lineId, quantity }) => {
    Medusa.cart.lineItems
      .update(state.cart.id, lineId, { quantity: quantity })
      .then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
      });
  };

  const getShippingOptions = async () => {
    const data = await Medusa.shippingOptions
      .list(state.cart.id)
      .then(({ data }) => data);

    if (data) {
      return data.shipping_options;
    } else {
      return undefined;
    }
  };

  const setShippingMethod = (id) => {
    Medusa.cart
      .setShippingMethod(state.cart.id, {
        option_id: id,
      })
      .then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
      });
  };

  const createPaymentSession = () => {
    Medusa.cart.createPaymentSessions(state.cart.id).then(({ data }) => {
      dispatch({ type: "setCart", payload: data.cart });
    });
  };

  const completeCart = async () => {
    const data = await Medusa.cart
      .completeCart(state.cart.id)
      .then(({ data }) => data);

    if (data) {
      return data.data;
    } else {
      return undefined;
    }
  };

  const retrieveOrder = async (orderId) => {
    const data = await Medusa.orders.retrieve(orderId).then(({ data }) => data);

    if (data) {
      return data.order;
    } else {
      return undefined;
    }
  };

  const updateAddress = (address, email) => {
    Medusa.cart
      .update(state.cart.id, {
        shipping_address: address,
        billing_address: address,
        email: email,
      })
      .then(({ data }) => {
        dispatch({ type: "setCart", payload: data.cart });
      });
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addVariantToCart,
        createCart,
        removeLineItem,
        updateLineItem,
        getShippingOptions,
        setShippingMethod,
        createPaymentSession,
        updateAddress,
        completeCart,
        retrieveOrder,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
