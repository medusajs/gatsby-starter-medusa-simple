import { Box, Flex } from "@theme-ui/components";
import React from "react";
import CartSummary from "../components/cart-summary";

import CheckoutSteps from "../components/checkout2/checkout-steps";

const Checkout = () => {
  return (
    <Flex
      sx={{
        position: "relative",
        height: "calc(100vh - 120px)",
        flexDirection: ["column-reverse", "row", "row"],
      }}
    >
      <CheckoutSteps />
      <Box
        sx={{
          width: ["100%", "50%", "40%"],
        }}
      >
        <CartSummary />
      </Box>
    </Flex>
  );
};

export default Checkout;
