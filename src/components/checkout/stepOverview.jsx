import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";

const StepOverview = () => {
  const { cart } = useContext(StoreContext);
  const { checkoutStep, updateCheckoutStep } = useContext(DisplayContext);
  return (
    <div>
      <div>
        <div>
          <h4 className="checkout-header">Details</h4>
        </div>
        <div className="done-steps">
          {cart?.shipping_address ? (
            <>
              <div className="checkout-step flex-row">
                <span className="detail">Contact </span>
                <div className="step-info">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </div>
                <button
                  className="step-back"
                  onClick={() => updateCheckoutStep(1)}
                >
                  Edit
                </button>
              </div>
              <div className="checkout-step flex-row">
                <span className="detail">Address</span>
                <div className="step-info">
                  {cart.shipping_address.address_1},{" "}
                  {cart.shipping_address.city}
                </div>
                <button
                  className="step-back"
                  onClick={() => updateCheckoutStep(1)}
                >
                  Edit
                </button>
              </div>
            </>
          ) : null}
          {cart?.shipping_methods[0] && checkoutStep !== 2 ? (
            <div className="checkout-step flex-row">
              <span className="detail">Shipping</span>
              <div className="step-info">
                {cart.shipping_methods[0].shipping_option.name}
              </div>
              <button
                className="step-back"
                onClick={() => updateCheckoutStep(2)}
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StepOverview;
