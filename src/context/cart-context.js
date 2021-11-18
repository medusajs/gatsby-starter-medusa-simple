import React from "react";
import { client } from "../utils/client";
import RegionContext from "./region-context";

const defaultCartContext = {
  cart: {
    items: [],
  },
};

const ACTIONS = {
  UPDATE_CART: "UPDATE_CART",
  RESET_CART: "RESET_CART",
};

const CartContext = React.createContext(defaultCartContext);
export default CartContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTIONS.RESET_CART:
      return {
        ...state,
        cart: {
          items: [],
        },
      };
    default:
      break;
  }
};

const CART_ID = "cart_id";

export const CartProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultCartContext);
  const cartId = React.useRef();
  const { region } = React.useContext(RegionContext);

  React.useEffect(() => {
    if (state.cart.id) {
      localStorage.setItem(CART_ID, state.cart.id);
      cartId.current = state.cart.id;
    }
  }, [state.cart?.id]);

  const createCart = async () => {
    const cart = await client.carts.create().then(({ data: { cart } }) => {
      return cart;
    });

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
    }
  };

  const fetchCart = async () => {
    let cart = undefined;

    const id = localStorage.getItem(CART_ID);

    if (id) {
      cart = await client.carts
        .retrieve(id)
        .then(({ data: { cart } }) => cart)
        .catch((_) => undefined);
    }

    if (cart) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
      return;
    }

    await createCart();
  };

  React.useEffect(() => {
    const initCart = async () => {
      fetchCart();
    };

    initCart();
  }, []);

  const addItem = async (item) => {
    const response = { cart: undefined, error: undefined };

    response.cart = await client.carts.lineItems
      .create(cartId.current, item)
      .then(({ data: { cart } }) => cart)
      .catch((err) => {
        response.error = err.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart });
    }

    return response;
  };

  const updateItem = async (item) => {
    const response = { cart: undefined, error: undefined };

    response.cart = await client.carts.lineItems
      .update(cartId.current, item.id, {
        quantity: item.quantity,
      })
      .then(({ data: { cart } }) => cart)
      .catch((err) => {
        response.error = err.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart });
    }

    return response;
  };

  const deleteItem = async (item) => {
    const response = { cart: undefined, error: undefined };

    response.cart = await client.carts.lineItems
      .delete(cartId.current, item.id)
      .then(({ data: { cart } }) => cart)
      .catch((err) => {
        response.error = err.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart });
    }

    return response;
  };

  const updateCart = async (update) => {
    const response = { cart: undefined, error: undefined };

    response.cart = await client.carts
      .update(cartId.current, update)
      .then(({ data: { cart } }) => cart)
      .catch((err) => {
        response.error = err.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart });
    }

    return response;
  };

  const removeDiscount = async (code) => {
    const response = { cart: undefined, error: undefined };

    response.cart = await client.carts
      .deleteDiscount(cartId.current, code)
      .then(({ data: { cart } }) => cart)
      .catch((err) => {
        response.error = err.response.data;
        return undefined;
      });

    if (!response.error) {
      dispatch({ type: ACTIONS.UPDATE_CART, payload: response.cart });
    }

    console.log(response);

    return response;
  };

  React.useEffect(() => {
    const updateCartRegion = async () => {
      const cart = await client.carts
        .update(cartId.current, { region_id: region.id })
        .then(({ data: { cart } }) => cart);

      dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
    };

    if (cartId.current && region?.id) {
      updateCartRegion();
    }
  }, [region?.id, cartId.current]);

  return (
    <CartContext.Provider
      {...props}
      value={{
        ...state,
        actions: {
          addItem,
          updateItem,
          deleteItem,
          updateCart,
          removeDiscount,
        },
      }}
    />
  );
};
