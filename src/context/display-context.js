import React from "react";

export const defaultDisplayContext = {
  shoppingCart: false,
};

const DisplayContext = React.createContext(defaultDisplayContext);
export default DisplayContext;

const ACTIONS = {
  UPDATE_SHOPPING_CART: "UPDATE_SHOPPING_CART",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_SHOPPING_CART:
      return { ...state, shoppingCart: !state.shoppingCart };
    default:
      return state;
  }
};

export const DisplayProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultDisplayContext);

  const updateCartViewDisplay = () => {
    dispatch({ type: ACTIONS.UPDATE_SHOPPING_CART });
  };

  return (
    <DisplayContext.Provider
      {...props}
      value={{
        ...state,
        actions: { updateCartViewDisplay },
      }}
    />
  );
};
