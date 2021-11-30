import { useCart } from "@medusajs/medusa-hooks";
import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import * as styles from "../../styles/checkout-step.module.css";
import CheckoutSummary from "./checkout-summary";
import InformationStep from "./information-step";
import PaymentStep from "./payment-step";
import ShippingStep from "./shipping-step";
import StepOverview from "./step-overview";


const CheckoutStep = () => {
  const { checkoutStep, updateOrderSummaryDisplay } =
    useContext(DisplayContext);
  const { cart } = useCart()

  const handleStep = () => {
    switch (checkoutStep) {
      case 1:
        return (
          <InformationStep
            savedValues={{
              ...cart.shipping_address,
              email: cart.email,
              country: cart.shipping_address?.country_code,
            }}
          />
        );
      case 2:
        return (
          <ShippingStep
            cart={cart}
            savedMethods={cart.shipping_methods}
          />
        );
      case 3:
        return <PaymentStep />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <div className={styles.breadcrumbs}>
          <p className={checkoutStep === 1 ? styles.activeStep : ""}>
            Information
          </p>
          <p>&gt;</p>
          <p className={checkoutStep === 2 ? styles.activeStep : ""}>
            Delivery
          </p>
          <p>&gt;</p>
          <p className={checkoutStep === 3 ? styles.activeStep : ""}>Payment</p>
        </div>
        {checkoutStep !== 1 ? <StepOverview /> : null}
        {handleStep()}
        <button
          className={styles.orderBtn}
          onClick={() => updateOrderSummaryDisplay()}
        >
          View Order Summary
        </button>
      </div>
      <div className={styles.summary}>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutStep;
