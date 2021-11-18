import React from "react";
import { useDisplay } from "../../hooks/useDisplay";
import { Button, Flex, Box, Text } from "@theme-ui/components";
import CartSummary from "../cart-summary";
import Link from "../link/link";

const ShoppingCart = () => {
  const {
    shoppingCart,
    actions: { updateCartViewDisplay },
  } = useDisplay();

  return (
    <Flex
      sx={{
        visibility: shoppingCart ? "visible" : "hidden",
        opacity: shoppingCart ? 1 : 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        width: "100%",
        height: "100vh",
        transition: "all .2s linear",
      }}
    >
      <Box
        sx={{
          bg: "rgba(0,0,0,.5)",
          width: [0, "50%", "50%"],
        }}
        onMouseEnter={() => updateCartViewDisplay()}
      ></Box>
      <Flex
        sx={{
          width: ["100%", "50%", "50%"],
          py: 4,
          px: 4,
          height: "100%",
          bg: "white",
          flexDirection: "column",
        }}
      >
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text as="h2" variant="accountDomain">
            Cart
          </Text>
          <Button
            variant="browser"
            sx={{
              color: "black",
              p: 0,
            }}
            onClick={() => updateCartViewDisplay()}
          >
            &times;
          </Button>
        </Flex>
        <Box
          sx={{
            flex: "1 1 auto",
            width: "100%",
            height: "100%",
          }}
        >
          <CartSummary editable={true} />
        </Box>
        <Flex>
          <Link to={"/checkout"}>
            <Button
              sx={{
                mt: 3,
              }}
              onClick={() => updateCartViewDisplay()}
            >
              Proceed to checkout
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ShoppingCart;
