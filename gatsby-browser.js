import React from "react";
import { DisplayProvider } from "./src/context/display-context";
import { StoreProvider } from "./src/context/store-context";
import Layout from "./src/components/layout/layout";
import { Location } from "@reach/router";

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider>
      <DisplayProvider>
        <Location>
          {(location) => <Layout location={location}>{element}</Layout>}
        </Location>
      </DisplayProvider>
    </StoreProvider>
  );
};
