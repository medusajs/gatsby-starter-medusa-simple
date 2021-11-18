import React from "react";
import { useCart } from "../../hooks/useCart";
import { Flex, Box, Button, Text } from "@theme-ui/components";

const ItemQuantity = ({ item }) => {
  const {
    actions: { updateItem },
  } = useCart();
  return (
    <Flex
      sx={{
        fontSize: [2],
      }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderColor: "ui200",
          flex: "0 1 auto",
        }}
      >
        <Button
          variant="qty"
          onClick={() =>
            updateItem({ id: item.id, quantity: item.quantity - 1 })
          }
        >
          –
        </Button>
        <Text
          sx={{
            width: "24px",
          }}
        >
          {item.quantity}
        </Text>
        <Button
          variant="qty"
          onClick={() =>
            updateItem({ id: item.id, quantity: item.quantity + 1 })
          }
        >
          +
        </Button>
      </Box>
    </Flex>
  );
};

export default ItemQuantity;
