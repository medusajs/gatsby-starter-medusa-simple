import { useContext } from "react";
import CartContext from "../context/cart-context";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart needs to used within a child of CartProvider");
  }

  return context;
};
