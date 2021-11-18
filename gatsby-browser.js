import React from "react";
import { MedusaProvider } from "./src/context/medusa-context";
import { ThemeProvider } from "@theme-ui/core";
import { theme } from "./src/theme";
import Layout from "./src/components/layouts";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <MedusaProvider>
        <Layout>{element}</Layout>
      </MedusaProvider>
    </ThemeProvider>
  );
};
