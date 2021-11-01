import { Button } from "@theme-ui/components";
import React, { useContext } from "react";
import CartContext from "../../../context/cart-context";

const CartSelector = () => {
  const { cart } = useContext(CartContext);
  return (
    <Button
      sx={{
        ml: 4,
        bg: "transparent",
        p: 0,
        color: "black",
        alignItems: "center",
      }}
    >{`Cart ${
      cart.items.length
        ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0
    }`}</Button>
  );
};

export default CartSelector;
