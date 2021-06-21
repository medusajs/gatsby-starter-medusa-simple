import React, { useContext } from "react";
import StoreContext from "../../context/store-context";
import { formatPrice } from "../../utils/helperFunctions";

const CartViewItem = (props) => {
  const { cart, updateLineItem, removeLineItem } = useContext(StoreContext);

  return (
    <div className="cv-item-container">
      <div className="flex-row justify-between">
        <p>{props.title}</p>
        <div className="flex-row">
          <p>{formatPrice(props.unit_price, cart.region.currency_code)}</p>
          <button
            className="remove-btn"
            onClick={() => removeLineItem(props.id)}
          >
            x
          </button>
        </div>
      </div>
      <div className="flex-row item-variant-info">
        <p>Size:</p>
        <p>{props.variant.title}</p>
      </div>
      <div className="flex-row qty-control">
        <button
          className="qty-btn btn"
          onClick={() =>
            updateLineItem({ lineId: props.id, quantity: props.quantity - 1 })
          }
        >
          -
        </button>
        <span className="qty-ticker">{props.quantity}</span>
        <button
          className="qty-btn btn"
          onClick={() =>
            updateLineItem({ lineId: props.id, quantity: props.quantity + 1 })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartViewItem;
