import React, { useContext } from "react";
import InformationModule from "./information/informationModule";
import NavBar from "../nav/navbar";
import { FaChevronRight } from "react-icons/fa";
import StoreContext from "../../context/store-context";
import CheckoutItem from "./summery/checkoutItem";
import ShippingModule from "./shipping/shippingModule";
import PaymentModule from "./payment/paymentModule";
import DisplayContext from "../../context/display-context";
import StepOverview from "./stepOverview";
import { formatPrice } from "../../utils/helperFunctions";

const CheckoutLayout = () => {
  const { cart } = useContext(StoreContext);
  const { checkoutStep, orderSummery, updateOrderSummeryDisplay } =
    useContext(DisplayContext);

  return (
    <div className="container">
      <NavBar isMain={false} />
      <div className="checkout-container">
        <div className="checkout-step-container">
          <div className="checkout-breadcrumbs flex-row">
            <span
              className={`breadcrumb ${checkoutStep === 1 ? "active" : ""}`}
            >
              Information
            </span>
            <span className="chevron">
              <FaChevronRight />
            </span>
            <span
              className={`breadcrumb ${checkoutStep === 2 ? "active" : ""}`}
            >
              Delivery
            </span>
            <span className="chevron">
              <FaChevronRight />
            </span>
            <span
              className={`breadcrumb ${checkoutStep === 3 ? "active" : ""}`}
            >
              Payment
            </span>
          </div>
          {checkoutStep === 1 ? (
            <InformationModule />
          ) : (
            <div>
              <StepOverview />
              {checkoutStep === 2 ? <ShippingModule /> : <PaymentModule />}
            </div>
          )}
        </div>
        <div className={`checkout-summery ${orderSummery ? "active" : ""}`}>
          <h2 className="">Order Summery</h2>
          {cart.items.length > 0
            ? cart.items.map((item, i) => {
                return (
                  <div key={i}>
                    <CheckoutItem {...item} />
                  </div>
                );
              })
            : null}
          <div className="cart-summery">
            <div>
              <div className="flex-row justify-between">
                <p>Subtotal (incl. taxes)</p>
                <span>
                  {cart.region
                    ? formatPrice(cart.subtotal, cart.region.currency_code)
                    : 0}
                </span>
              </div>
            </div>
            <div className="flex-row justify-between p-y1">
              <p>Shipping</p>
              <span>
                {cart.shipping_methods && cart.shipping_methods.length > 0
                  ? formatPrice(
                      cart.shipping_methods[0].shipping_option.amount,
                      cart.region.currency_code
                    )
                  : "Not selected"}
              </span>
            </div>
            <div className="flex-row justify-between total p-y1">
              <p>Total</p>
              <span>
                {cart.region
                  ? formatPrice(cart.total, cart.region.currency_code)
                  : 0}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => updateOrderSummeryDisplay()}
          className="mobile-view-btn big-btn"
        >
          {`${orderSummery ? "Close Order Summery" : "View Order Summery"}`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutLayout;
