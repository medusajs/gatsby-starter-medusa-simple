import React, { useContext } from "react";
import { PuffLoader } from "react-spinners";
import * as styles from "../../styles/checkout-summary.module.css";
import * as itemStyles from "../../styles/cart-view.module.css";
import { Link } from "gatsby";
import { pluralize } from "../../utils/helper-functions";
import DisplayContext from "../../context/display-context";
import { formatAmount, useCart } from "@medusajs/medusa-hooks";

const CheckoutSummary = () => {
  const { orderSummary, updateOrderSummaryDisplay } =
    useContext(DisplayContext);

  const { cart, totalItems, startCheckout } = useCart()

  return !startCheckout.isLoading ? (
    <div className={`${styles.container} ${orderSummary ? styles.active : ""}`}>
      <div className={itemStyles.top}>
        <p>
          <strong>Order Summary</strong>
        </p>
        <p>
          {totalItems}{" "}
          {pluralize('item', totalItems)}
        </p>
        <button
          className={styles.closeBtn}
          onClick={() => updateOrderSummaryDisplay()}
        >
          X
        </button>
      </div>
      <div className={itemStyles.overview}>
        {cart?.items
          .map((i) => {
            return (
              <div key={i.id} className={itemStyles.product}>
                <figure>
                  <Link to={`/product/${i.variant.product.id}`}>
                    {/* Replace with a product thumbnail/image */}
                    <div className={itemStyles.placeholder}>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={i.variant.product.thumbnail}
                        alt={`${i.title}`}
                      />
                    </div>
                  </Link>
                </figure>
                <div className={itemStyles.controls}>
                  <div>
                    <div>
                      <Link to={`/product/${i.variant.product.id}`}>
                        {i.title}
                      </Link>
                      <p className={itemStyles.size}>Size: {i.variant.title}</p>
                      <p className={itemStyles.size}>
                        Price:{" "}
                        {formatAmount(i.unit_price, cart.region)}
                      </p>
                      <p className={itemStyles.size}>Quantity: {i.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.breakdown}>
        <p>Subtotal (incl. taxes)</p>
        <span>
          {formatAmount(cart.subtotal, cart.region)}
        </span>
      </div>
      <div className={styles.breakdown}>
        <p>Shipping</p>
        <span>
          {formatAmount(cart.shipping_total, cart.region)}
        </span>
      </div>
      <div className={styles.total}>
        <p>Total</p>
        <span>
          {formatAmount(cart.total, cart.region)}
        </span>
      </div>
    </div>
  ) : (
    <div className={styles.spinnerContainer}>
      <PuffLoader />
    </div>
  );
};

export default CheckoutSummary;
