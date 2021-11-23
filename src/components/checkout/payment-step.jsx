import React, { useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { Elements } from "@stripe/react-stripe-js";
import InjectablePaymentCard from "./injectable-payment-card";
import * as styles from "../../styles/injectable-payment-card.module.css";
import getStripe from "../../utils/stripe";
import { useServerCart } from "@medusajs/medusa-hooks";

const PaymentStep = () => {
  const { cart, createPaymentSession, setPaymentSession } =
    useServerCart()

  useEffect(() => {
    createPaymentSession();
  }, []);

  const handlePayment = async () => {
    await setPaymentSession({ provider_id: "manual" }).then(() => {
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
                    onSetPaymentSession={() => setPaymentSession({ provider_id: "stripe" })}
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
