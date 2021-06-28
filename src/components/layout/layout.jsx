import React, { useContext, useEffect, useState } from "react";
import NavBar from "./navBar";
import Blur from "./blur";
import CartView from "../cartView/cartView";
import DisplayContext from "../../context/display-context";
import * as styles from "../../styles/Layout.module.css";
import "../../styles/globals.css";
import { globalHistory } from "@reach/router";

const Layout = ({ children }) => {
  const { cartView } = useContext(DisplayContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const path = globalHistory.location.pathname;

  useEffect(() => {
    if (path === "/checkout" || path === "/payment") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [path]);

  return (
    <div className={cartView ? styles.noscroll : null}>
      <CartView />
      <Blur />
      <NavBar isCheckout={isCheckout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
