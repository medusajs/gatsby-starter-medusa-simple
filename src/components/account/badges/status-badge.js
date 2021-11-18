import React, { useEffect, useState } from "react";
import { Badge } from "@theme-ui/components";

const TYPES = {
  PAYMENT: "payment",
  FULFILLMENT: "fulfillment",
};

const PAYMENT_STATUS = {
  NOT_PAID: "not_paid",
  AWAITING: "awaiting",
  CAPTURED: "captured",
  PARTIALLY_REFUNDED: "partially_refunded",
  REFUNDED: "refunded",
  CANCELED: "canceled",
  REQUIRES_ACTION: "requires_action",
};

const FULFILLMENT_STATUS = {
  NOT_FULFILLED: "not_fulfilled",
  PARTIALLY_FULFILLED: "partially_fulfilled",
  FULFILLED: "fulfilled",
  PARTIALLY_SHIPPED: "partially_shipped",
  SHIPPED: "shipped",
  PARTIALLY_RETURNED: "partially_returned",
  RETURNED: "returned",
  CANCELED: "canceled",
  REQUIRES_ACTION: "requires_action",
};

const StatusLabel = ({ type, status }) => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  useEffect(() => {
    switch (type) {
      case TYPES.PAYMENT:
        switch (status) {
          case PAYMENT_STATUS.NOT_PAID:
            setMessage("Not Paid");
            setColor("red");
            break;
          case PAYMENT_STATUS.AWAITING:
            setMessage("Awaiting");
            setColor("yellow");
            break;
          case PAYMENT_STATUS.CAPTURED:
            setMessage("Paid");
            setColor("green");
            break;
          case PAYMENT_STATUS.PARTIALLY_REFUNDED:
            setMessage("Partially Refunded");
            setColor("yellow");
            break;
          case PAYMENT_STATUS.REFUNDED:
            setMessage("Refunded");
            setColor("green");
            break;
          case PAYMENT_STATUS.CANCELED:
            setMessage("Canceled");
            setColor("red");
            break;
          case PAYMENT_STATUS.REQUIRES_ACTION:
            setMessage("Requires Action");
            setColor("red");
            break;
          default:
            break;
        }
        break;
      case TYPES.FULFILLMENT:
        switch (status) {
          case FULFILLMENT_STATUS.CANCELED:
            setMessage("Canceled");
            setColor("red");
            break;
          case FULFILLMENT_STATUS.FULFILLED:
            setMessage("Processed");
            setColor("yellow");
            break;
          case FULFILLMENT_STATUS.NOT_FULFILLED:
            setMessage("Processing");
            setColor("yellow");
            break;
          case FULFILLMENT_STATUS.PARTIALLY_FULFILLED:
            setMessage("Partially Processed");
            setColor("yellow");
            break;
          case FULFILLMENT_STATUS.PARTIALLY_RETURNED:
            setMessage("Partially Returned");
            setColor("yellow");
            break;
          case FULFILLMENT_STATUS.RETURNED:
            setMessage("Returned");
            setColor("green");
            break;
          case FULFILLMENT_STATUS.PARTIALLY_SHIPPED:
            setMessage("Partially Shipped");
            setColor("yellow");
            break;
          case FULFILLMENT_STATUS.SHIPPED:
            setMessage("Shipped");
            setColor("green");
            break;
          case FULFILLMENT_STATUS.REQUIRES_ACTION:
            setMessage("Requires Action");
            setColor("red");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }, [type, status]);

  return <Badge variant={color}>{message.toUpperCase()}</Badge>;
};

export default StatusLabel;
