import { useCart } from "@medusajs/medusa-hooks";
import { Elements } from "@stripe/react-stripe-js";
import { navigate } from "gatsby";
import React from "react";
import * as styles from "../../styles/injectable-payment-card.module.css";
import getStripe from "../../utils/stripe";
import InjectablePaymentCard from "./injectable-payment-card";

const PaymentStep = () => {
  const { cart, pay } =
    useCart()

  const handlePayment = async () => {
    await pay.mutateAsync({ provider_id: 'manual' }).then(() => {
      navigate(`/payment`);
    });
  };

  return (
    <div style={{ flexGrow: "1" }}>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map((ps) => {
          switch (ps.provider_id) {
            case "stripe":
              return (
                <Elements key={"stripe"} stripe={getStripe()}>
                  <h2>Stripe Payment</h2>
                  <InjectablePaymentCard
                    session={ps}
                    onSetPaymentSession={() => pay.mutate({ provider_id: 'stripe' })}
                  />
                </Elements>
              );
            case "manual":
              return (
                <div key={"manual"}>
                  <h2>Test Payment</h2>
                  <button
                    onClick={handlePayment}
                    className={styles.payBtn}
                    id="submit"
                  >
                    <span id="button-text">Pay</span>
                  </button>
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};



export default PaymentStep;
