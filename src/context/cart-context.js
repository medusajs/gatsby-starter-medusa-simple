import React from "react";
import { client } from "../utils/client";

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
    const cart = await client.carts.lineItems
      .create(cartId.current, item)
      .then(({ data: { cart } }) => cart);

    dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
  };

  const updateItem = async (item) => {
    const cart = await client.carts.lineItems
      .update(cartId, item.id, {
        quantity: item.quantity,
      })
      .then(({ data: { cart } }) => cart);

    dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
  };

  const deleteItem = async (item) => {
    const cart = await client.carts.lineItems
      .delete(cartId, item.id)
      .then(({ data: { cart } }) => cart);

    dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
  };

  /**
   * Updates the current cart with
   * @param {CartUpdateResource} update
   */
  const updateCart = async (update) => {
    const cart = await client.carts
      .update(cartId, update)
      .then(({ cart }) => cart);
    dispatch({ type: ACTIONS.UPDATE_CART, payload: cart });
  };

  return (
    <CartContext.Provider
      {...props}
      value={{ ...state, addItem, updateItem, deleteItem, updateCart }}
    />
  );
};

/**
 * @typedef {{billing_address: any, shipping_address: any}} CartUpdateResource
 */
