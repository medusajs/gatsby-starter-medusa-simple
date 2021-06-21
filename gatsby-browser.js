import React from "react";
import { DisplayProvider } from "./src/context/display-context";
import { StoreProvider } from "./src/context/store-context";

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider>
      <DisplayProvider>{element}</DisplayProvider>
    </StoreProvider>
  );
};
