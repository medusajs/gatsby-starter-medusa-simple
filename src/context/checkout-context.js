import React from "react";
import { useCart } from "../hooks/useCart";

export const defaultCheckoutContext = {
  activeStep: "INFORMATION",
};

const CheckoutContext = React.createContext(defaultCheckoutContext);
export default CheckoutContext;

const ACTIONS = {
  UPDATE_STEP: "UPDATE_STEP",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STEP:
      return { ...state, activeStep: action.payload };
    default:
      return state;
  }
};

export const CheckoutProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, defaultCheckoutContext);
  const { cart } = useCart()

  const possibleSteps = ["INFORMATION", "SHIPPING", "PAYMENT", "REVIEW"];

  const updateStep = (step) => {
    if (!possibleSteps.includes(step)) {
      throw new Error(
        "Not a valid step, must be one of 'INFO', 'SHIPPING', 'PAYMENT', or 'REVIEW'."
      );
    }
    dispatch({ type: ACTIONS.UPDATE_STEP, payload: step });
  };

  return (
    <CheckoutContext.Provider
      {...props}
      value={{
        ...state,
        possibleSteps,
        actions: { updateStep },
      }}
    />
  );
};
