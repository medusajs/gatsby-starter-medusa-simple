import React, { useState, useEffect, useContext } from "react";
import * as styles from "../../styles/shipping-step.module.css";
import ShippingMethod from "./shipping-method";
import { BiLeftArrowAlt } from "react-icons/bi";
import DisplayContext from "../../context/display-context";
import { isEmpty } from "lodash";
import { MdError } from "react-icons/md";
import { useCartShippingOptions } from "@medusajs/medusa-hooks";

const ShippingStep = ({ handleDeliverySubmit, cart }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState();
  const [error, setError] = useState(false);
  const { updateCheckoutStep } = useContext(DisplayContext);

  const { shipping_options: shippingOptions } = useCartShippingOptions(cart.id)

  useEffect(() => {
    //if method is already selected, then preselect
    if (cart.shipping_methods.length > 0) {
      setSelectedOption(cart.shipping_methods[0].shipping_option);
    }
  }, [cart, setSelectedOption]);

  const handleSelectOption = (o) => {
    setSelectedOption(o);

    if (error) {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError(true);
    } else {
      setIsLoading(true)
      handleDeliverySubmit(selectedOption).then(() => setIsLoading(false))
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delivery</h2>
      {isEmpty(shippingOptions) ? (
        <div>loading...</div>
    ) : isLoading ? <div>loading...</div> : (
        <div>
          {shippingOptions.map((so) => {
            return (
              <div key={so.id}>
                <ShippingMethod
                  option={so}
                  chosen={selectedOption}
                  handleOption={handleSelectOption}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className={`${styles.error} ${error ? styles.active : ""} `}>
        <MdError />
        <p>Select a shipping method</p>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.stepBack}
          onClick={() => updateCheckoutStep(1)}
        >
          <BiLeftArrowAlt /> Back to information
        </button>
        <button className={styles.nextBtn} onClick={handleSubmit}>
          <span id="button-text">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ShippingStep;
