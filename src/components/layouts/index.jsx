import { Box } from "@theme-ui/components";
import Footer from "./footer";
import Nav from "./nav";
import React from "react";
import ShoppingCart from "../shopping-cart";
import { useCheckout } from "../../hooks/useCheckout";

const Layout = ({ children }) => {
  const { isCheckout } = useCheckout();

  return (
    <Box
      sx={{
        position: "relative",
        fontFamily: "body",
        button: {
          fontFamily: "body",
        },
      }}
    >
      <ShoppingCart />
      <Nav />
      <Box
        sx={{
          px: 4,
          py: 2,
        }}
        as="main"
      >
        {children}
      </Box>
      {!isCheckout && <Footer />}
    </Box>
  );
};

export default Layout;
