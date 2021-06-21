import React from "react";
import "./styles.css";
import NavBar from "../nav/navbar";
import Blur from "./blur";
import CartView from "../cartView/cartview";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <CartView />
      <Blur />
      <NavBar isMain={true} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
