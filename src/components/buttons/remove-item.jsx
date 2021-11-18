import React from "react";
import { Button } from "@theme-ui/components";
import { useCart } from "../../hooks/useCart";

const RemoveItem = ({ item }) => {
  const {
    actions: { deleteItem },
  } = useCart();
  return (
    <Button
      variant="remove"
      sx={{
        ml: 3,
      }}
      onClick={() => deleteItem(item)}
    >
      &times;
    </Button>
  );
};

export default RemoveItem;
