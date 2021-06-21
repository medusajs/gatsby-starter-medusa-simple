import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StoreContext from "../../../context/store-context";
import DisplayContext from "../../../context/display-context";
import { navigate } from "gatsby";

const InjectableCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { cart, completeCart } = useContext(StoreContext);
  const { updateCheckoutStep } = useContext(DisplayContext);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(
      cart.payment_session.data.client_secret,
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
      completeCart().then((order) => {
        navigate(`/order/${order.id}`);
      });
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        className="card-form"
        id="card-element"
        onChange={handleChange}
      />
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <div className="flex-row justify-between checkout-controls">
        <button className="step-back" onClick={() => updateCheckoutStep(2)}>
          Back to shipping method
        </button>
        <button
          className="big-btn"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">{processing ? "Processing" : "Pay"}</span>
        </button>
      </div>
    </form>
  );
};

export default InjectableCardForm;
