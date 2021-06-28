import React from "react";
import { DisplayProvider } from "./src/context/display-context";
import { StoreProvider } from "./src/context/store-context";
import Layout from "./src/components/layout/layout";

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider>
      <DisplayProvider>
        <Layout>{element}</Layout>
      </DisplayProvider>
    </StoreProvider>
  );
};
