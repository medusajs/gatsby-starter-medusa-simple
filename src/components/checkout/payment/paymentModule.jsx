import React, { useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StoreContext from "../../../context/store-context";
import InjectableCardForm from "./injectableCardForm";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_KEY || null);

const PaymentModule = () => {
  const { createPaymentSession } = useContext(StoreContext);

  useEffect(() => {
    createPaymentSession();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div>
        <h4 className="checkout-header">Payment</h4>
      </div>
      <InjectableCardForm />
    </Elements>
  );
};

export default PaymentModule;
