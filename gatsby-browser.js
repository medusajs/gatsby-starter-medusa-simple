import React from "react";
import { MedusaProvider } from "./src/context/medusa-context";
import Layout from "./src/components/layouts/index";

export const wrapRootElement = ({ element }) => {
  return (
    <MedusaProvider>
      <Layout>{element}</Layout>
    </MedusaProvider>
  );
};
