import React, { useContext, useEffect, useState } from "react";
import DisplayContext from "../../../context/display-context";
import StoreContext from "../../../context/store-context";
import { formatPrice } from "../../../utils/helperFunctions";

const ShippingModule = () => {
  const { cart, setShippingMethod, getShippingOptions } =
    useContext(StoreContext);
  const { updateCheckoutStep } = useContext(DisplayContext);
  const [selectedOptions, setSelectedOptions] = useState();
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    if (!cart.shipping_address?.country_code) {
      return;
    }

    getShippingOptions().then((partitioned) => {
      setShippingOptions(partitioned);
    });

    //if method is already selected, then preselect
    if (cart.shipping_methods.length > 0) {
      setSelectedOptions(cart.shipping_methods[0].shipping_option.id);
    }
  }, [cart]);

  const handleSelect = (i) => {
    setSelectedOptions(i);
    setShippingMethod(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCheckoutStep(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="checkout-header">Shipping</h4>
      {shippingOptions.map((so) => {
        return (
          <div
            key={so.id}
            className="flex-row justify-between shipping-option"
            onClick={() => handleSelect(so.id)}
            role="button"
            tabIndex="0"
          >
            <div className="flex-row">
              <input
                type="radio"
                className="radio"
                value={so.id}
                onChange={() => handleSelect(so.id)}
                checked={so.id === selectedOptions ? true : false}
              />
              <p>{so.name}</p>
            </div>
            <span style={{ whiteSpace: "nowrap" }}>
              {formatPrice(so.amount, cart.region.currency_code)}
            </span>
          </div>
        );
      })}
      <div className="flex-row justify-between checkout-controls">
        <button className="step-back" onClick={() => updateCheckoutStep(1)}>
          Back to information
        </button>
        <button
          className="big-btn"
          type="submit"
          disabled={!selectedOptions ? true : ""}
        >
          Next
        </button>
      </div>
    </form>
  );
};
export default ShippingModule;
