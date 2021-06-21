import { Link } from "gatsby";
import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { quantity, sum } from "../../utils/helperFunctions";
import { BiShoppingBag } from "react-icons/bi";

export const NavBar = ({ isMain }) => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);

  return (
    <header className="flex-row justify-between navigation">
      <Link to="/">
        <h1 className="logo">medusa</h1>
      </Link>
      {isMain ? (
        <div className="flex-row">
          <button
            className="cart-button"
            onClick={() => updateCartViewDisplay()}
          >
            <BiShoppingBag />{" "}
            <span>
              {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
            </span>
          </button>
        </div>
      ) : null}
    </header>
  );
};

export default NavBar;
