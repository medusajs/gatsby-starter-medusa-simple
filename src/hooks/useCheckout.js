import React from "react";
import CheckoutContext from "../context/checkout-context";
import { useLocation } from "@reach/router";

export const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  const { pathname } = useLocation();

  const isCheckout = React.useMemo(() => {
    return pathname === "/checkout";
  }, [pathname]);

  if (!context) {
    throw new Error(
      "useCheckout hook was used but a CheckoutContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of CheckoutProvider"
    );
  }

  return { ...context, isCheckout };
};
