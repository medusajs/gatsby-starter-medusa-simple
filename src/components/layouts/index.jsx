import { Box } from "@theme-ui/components";
import Footer from "./footer";
import Nav from "./nav";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
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
      <Footer />
    </Box>
  );
};

export default Layout;
