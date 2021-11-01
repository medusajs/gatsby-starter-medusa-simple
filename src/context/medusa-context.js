import React from "react";
import { CartProvider } from "./cart-context";
import { CustomerProvider } from "./customer-context";
import { RegionProvider } from "./region-context";

const MedusaContext = React.createContext(null);
export default MedusaContext;

export const MedusaProvider = ({ children, ...rest }) => {
  return (
    <MedusaContext.Provider {...rest} value={null}>
      <RegionProvider>
        <CartProvider>
          <CustomerProvider>{children}</CustomerProvider>
        </CartProvider>
      </RegionProvider>
    </MedusaContext.Provider>
  );
};
