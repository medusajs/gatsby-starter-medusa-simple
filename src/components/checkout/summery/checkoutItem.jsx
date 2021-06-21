import React, { useContext } from "react";
import StoreContext from "../../../context/store-context";
import { formatPrice } from "../../../utils/helperFunctions";

const CheckoutItem = (props) => {
  const { currencyCode } = useContext(StoreContext);
  return (
    <div className="checkout-item">
      <div className="item-info">
        <p className="item-title">{props.title}</p>
        <p className="item-detail">Size: {props.description}</p>
        <p className="item-detail">Quantity: {props.quantity}</p>
      </div>
      <div>
        <p>{formatPrice(props.unit_price, currencyCode)}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
