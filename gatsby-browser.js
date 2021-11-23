import React from "react";
import { DisplayProvider } from "./src/context/display-context";
import { StoreProvider } from "./src/context/store-context";
import Layout from "./src/components/layout/layout";
import { Location } from "@reach/router";
import { MedusaProvider, ServerCartProvider } from "@medusajs/medusa-hooks";
import { QueryClient } from "react-query";
import Medusa from "@medusajs/medusa-js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      retry: 1,
    },
  },
});
const medusaClient = new Medusa({ baseUrl: "http://localhost:9000" });

export const wrapRootElement = ({ element }) => {
  return (
    // <StoreProvider>
    <MedusaProvider
      medusaClient={medusaClient}
      queryClientProviderProps={{ client: queryClient }}
    >
      <ServerCartProvider>
        <DisplayProvider>
          <Location>
            {(location) => <Layout location={location}>{element}</Layout>}
          </Location>
        </DisplayProvider>
      </ServerCartProvider>
    </MedusaProvider>
    // </StoreProvider>
  );
};
