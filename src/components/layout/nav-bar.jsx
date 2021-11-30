import { useBag } from "@medusajs/medusa-hooks";
import { Link } from "gatsby";
import React, { useContext } from "react";
import { BiShoppingBag } from "react-icons/bi";
import DisplayContext from "../../context/display-context";
import MedusaLogo from "../../images/medusa-logo.svg";
import * as styles from "../../styles/nav-bar.module.css";

const NavBar = ({ isCheckout }) => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { totalItems } = useBag()

  return (
    <div className={styles.container}>
      <Link to="/" style={{ width: "125px" }}>
        <img src={MedusaLogo} style={{ maxHeight: "40px" }} alt="logo" />
      </Link>
      {!isCheckout ? (
        <button className={styles.btn} onClick={() => updateCartViewDisplay()}>
          <span>Cart</span>
          <BiShoppingBag />{" "}
          <span>
            {totalItems}
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default NavBar;
