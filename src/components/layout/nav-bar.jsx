import { Link } from "gatsby";
import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { quantity, sum } from "../../utils/helper-functions";
import { BiShoppingBag } from "react-icons/bi";
import * as styles from "../../styles/nav-bar.module.css";

const NavBar = ({ isCheckout }) => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.logo}>medusa</h1>
      </Link>
      {!isCheckout ? (
        <button className={styles.btn} onClick={() => updateCartViewDisplay()}>
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
