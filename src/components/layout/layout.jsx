import React, { useContext, useEffect, useState } from "react";
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";
import * as styles from "../../styles/layout.module.css";
import "../../styles/globals.css";

const Layout = ({ location, children }) => {
  const { cartView } = useContext(DisplayContext);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (
      location.location.pathname === "/checkout" ||
      location.location.pathname === "/payment"
    ) {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [location]);

  return (
    <div className={cartView ? styles.noscroll : null}>
      <main>
        <CartView />
        <Blur />
        <NavBar isCheckout={isCheckout} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
