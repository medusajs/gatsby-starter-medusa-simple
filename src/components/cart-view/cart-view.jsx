import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import { Link, navigate } from "gatsby";
import * as styles from "../../styles/cart-view.module.css";
import { pluralize } from "../../utils/helper-functions";
import { formatAmount, useBag, useCart } from "@medusajs/medusa-hooks";
import { isEmpty } from "lodash";

const CartView = () => {
  const { cartView, updateCartViewDisplay, updateCheckoutStep } =
    useContext(DisplayContext);
  const { items, totalItems, bagTotal, updateItemQuantity, removeItem, region } =
    useBag();
  const { startCheckout } = useCart();

  return (
    <div className={`${styles.container} ${cartView ? styles.active : null}`}>
      <div className={styles.top}>
        <p>Bag</p>
        <p>
          {totalItems} {pluralize("item", totalItems)}
        </p>
        <button
          className={styles.closebtn}
          onClick={() => updateCartViewDisplay()}
        >
          X
        </button>
      </div>
      <div className={styles.overview}>
        {items.map(({ variant, total, quantity }) => {
          return (
            <div key={variant.id} className={styles.product}>
              <figure onClick={() => updateCartViewDisplay()}>
                <Link to={`/product/${variant.product_id}`}>
                  {/* Replace with a product thumbnail/image */}
                  <div className={styles.placeholder}>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={variant.product.thumbnail}
                      alt={`${variant.title}`}
                    />
                  </div>
                </Link>
              </figure>
              <div className={styles.controls}>
                <div>
                  <div>
                    <Link to={`/product/${variant.product.id}`}>
                      {variant.title}
                    </Link>
                    <p className={styles.size}>Size: {variant.title}</p>
                    <p className={styles.size}>Price: {formatAmount(total, region)}</p>
                  </div>
                  <div>
                    <div className={styles.mid}>
                      <div className={styles.selector}>
                        <button
                          className={styles.qtybtn}
                          onClick={() => updateItemQuantity(variant.id, quantity - 1)}
                        >
                          {"–"}
                        </button>
                        <p className={styles.ticker}>{quantity}</p>
                        <button
                          className={styles.qtybtn}
                          onClick={() => updateItemQuantity(variant.id, quantity + 1)}
                        >
                          {"+"}
                        </button>
                      </div>
                    </div>
                    <p>{}</p>
                  </div>
                </div>
                <button
                  className={styles.remove}
                  onClick={() => removeItem(variant.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.subtotal}>
        <p>Subtotal (incl. taxes)</p>
        <span>{!isEmpty(region) ? formatAmount(bagTotal, region) : 0}</span>
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.checkoutbtn}
          onClick={() => {
            startCheckout.mutate({
              region_id: region.id,
              items: items.map(({ variant, quantity }) => ({
                variant_id: variant.id,
                quantity,
              })),
            });
            updateCheckoutStep(1);
            updateCartViewDisplay();
            navigate("/checkout");
          }}
          disabled={totalItems < 1}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartView;
