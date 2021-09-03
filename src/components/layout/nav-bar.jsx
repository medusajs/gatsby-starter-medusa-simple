import { Link } from "gatsby";
import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { quantity, sum } from "../../utils/helper-functions";
import { BiShoppingBag } from "react-icons/bi";
import * as styles from "../../styles/nav-bar.module.css";
import MedusaLogo from "../../images/medusa-logo.svg";

const NavBar = ({ isCheckout }) => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);

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
            {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default NavBar;
