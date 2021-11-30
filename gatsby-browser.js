import {
  BagProvider,
  CartProvider,
  MedusaProvider,
} from "@medusajs/medusa-hooks";
import Medusa from "@medusajs/medusa-js";
import { Location } from "@reach/router";
import React from "react";
import { QueryClient } from "react-query";
import Layout from "./src/components/layout/layout";
import { DisplayProvider } from "./src/context/display-context";
import { RegionSelector } from "./src/context/region-selector";

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
    <MedusaProvider
      medusaClient={medusaClient}
      queryClientProviderProps={{ client: queryClient }}
    >
      <BagProvider>
        <CartProvider>
          <RegionSelector>
            <DisplayProvider>
              <Location>
                {(location) => <Layout location={location}>{element}</Layout>}
              </Location>
            </DisplayProvider>
          </RegionSelector>
        </CartProvider>
      </BagProvider>
    </MedusaProvider>
  );
};
