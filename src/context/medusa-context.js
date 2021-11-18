import React from "react";
import { CartProvider } from "./cart-context";
import { CustomerProvider } from "./customer-context";
import { RegionProvider } from "./region-context";
import { DisplayProvider } from "./display-context";
import { CheckoutProvider } from "./checkout-context";
import { LocationProvider } from "@reach/router";
import { ReturnProvider } from "./returns-context";

const MedusaContext = React.createContext(null);
export default MedusaContext;

export const MedusaProvider = ({ children, ...rest }) => {
  return (
    <MedusaContext.Provider {...rest} value={null}>
      <LocationProvider>
        <RegionProvider>
          <ReturnProvider>
            <CustomerProvider>
              <CartProvider>
                <CheckoutProvider>
                  <DisplayProvider>{children}</DisplayProvider>
                </CheckoutProvider>
              </CartProvider>
            </CustomerProvider>
          </ReturnProvider>
        </RegionProvider>
      </LocationProvider>
    </MedusaContext.Provider>
  );
};
