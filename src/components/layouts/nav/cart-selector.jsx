import { Button } from "@theme-ui/components";
import React from "react";
import { useCart } from "../../../hooks/useCart";
import { useDisplay } from "../../../hooks/useDisplay";

const CartSelector = () => {
  const { cart } = useCart();
  const {
    actions: { updateCartViewDisplay },
  } = useDisplay();
  return (
    <Button
      sx={{
        ml: 4,
        bg: "transparent",
        p: 0,
        color: "black",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => updateCartViewDisplay()}
    >{`Cart ${cart.items.length}`}</Button>
  );
};

export default CartSelector;
