import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { formatPrice } from "../../utils/helperFunctions";
import CartViewItem from "./cartViewItem";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { navigate } from "gatsby";

const CartView = () => {
  const { cartView, updateCartViewDisplay, updateCheckoutStep } =
    useContext(DisplayContext);
  const { cart, currencyCode } = useContext(StoreContext);

  return (
    <div className={`cart-view-container ${cartView ? "active" : ""}`}>
      <div className="flex-column inner-cart-view">
        <div className="cart-view-controls flex-row justify-between">
          <h1>Cart</h1>
          <button onClick={() => updateCartViewDisplay()}>Close</button>
        </div>
        <div className="flex-column cart-view-item-overview">
          {cart.items.map((i) => {
            return (
              <div key={i.id}>
                <CartViewItem {...i} />
              </div>
            );
          })}
        </div>
        <div className="cart-summery">
          <div>
            <div className="flex-row justify-between">
              <p>Subtotal (incl. taxes)</p>
              <span>
                {cart.region ? formatPrice(cart.subtotal, currencyCode) : 0}
              </span>
            </div>
          </div>
          <div className="flex-row justify-between p-y1">
            <p>Shipping</p>
            <span>
              {cart.shipping_methods && cart.shipping_methods.length > 0
                ? formatPrice(
                    cart.shipping_methods[0].shipping_option.amount,
                    currencyCode
                  )
                : "Not selected"}
            </span>
          </div>
          <div className="flex-row justify-between total p-y1">
            <p>Total</p>
            <span>
              {cart.region ? formatPrice(cart.total, currencyCode) : 0}
            </span>
          </div>
        </div>
        <div className="flex-row justify-between">
          <div className="card-icons">
            <span className="icon">
              <FaCcMastercard />
            </span>
            <span className="icon">
              <FaCcVisa />
            </span>
          </div>
          <button
            className="big-btn"
            onClick={() => {
              updateCheckoutStep(1);
              updateCartViewDisplay();
              navigate("/checkout");
            }}
            disabled={cart.items.length < 1 ? true : ""}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
