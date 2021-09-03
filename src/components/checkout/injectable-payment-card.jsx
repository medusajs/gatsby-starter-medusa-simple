import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { navigate } from "gatsby";
import DisplayContext from "../../context/display-context";
import * as styles from "../../styles/injectable-payment-card.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";

const InjectablePaymentCard = ({ session, onSetPaymentSession }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { updateCheckoutStep } = useContext(DisplayContext);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    await onSetPaymentSession();

    const payload = await stripe.confirmCardPayment(
      session.data.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );
    if (payload.error) {
      setError(`${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate(`/payment`);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        className={styles.cardForm}
        id="card-element"
        onChange={handleChange}
      />
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <div className={styles.controls}>
        <button
          className={styles.stepBack}
          onClick={() => updateCheckoutStep(2)}
        >
          <BiLeftArrowAlt /> Back to shipping method
        </button>
        <button
          className={styles.payBtn}
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">{processing ? "Processing" : "Pay"}</span>
        </button>
      </div>
    </form>
  );
};

export default InjectablePaymentCard;
