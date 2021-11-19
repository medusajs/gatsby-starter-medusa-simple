import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../context/store-context";
import * as itemStyles from "../styles/cart-view.module.css";
import * as styles from "../styles/payment.module.css";
import { formatPrice } from "../utils/helper-functions";

const style = {
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const Payment = () => {
  const [order, setOrder] = useState();
  const { cart, completeCart, createCart } = useContext(StoreContext);

  useEffect(() => {
    if (cart.items.length > 0) {
      completeCart().then((order) => {
        setOrder(order);
        createCart();
      });
    }
  }, []);

  return !order ? (
    <div style={style}>
      <p>Hang on while we validate your payment...</p>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Order Summary</h1>
        <p>Thank you for your order!</p>
      </div>
      <div className={styles.items}>
        {order.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at);

            if (createdAtA < createdAtB) return -1;
            if (createdAtA > createdAtB) return 1;
            return 0;
          })
          .map((i) => {
            return (
              <div key={i.id} className={styles.item}>
                <div className={itemStyles.product}>
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
                        <p className={itemStyles.size}>
                          Size: {i.variant.title}
                        </p>
                        <p className={itemStyles.size}>
                          Price:{" "}
                          {formatPrice(i.unit_price, order.currency_code)}
                        </p>
                        <p className={itemStyles.size}>
                          Quantity: {i.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <div className={styles.price}>
          <div>Subtotal</div>
          <div>{formatPrice(order.subtotal, order.region.currency_code)}</div>
        </div>
        <div className={styles.price}>
          <div>Shipping</div>
          <div>
            {formatPrice(order.shipping_total, order.region.currency_code)}
          </div>
        </div>
        <div className={`${styles.price} ${styles.total}`}>
          <div>Total</div>
          <div>{formatPrice(order.total, order.region.currency_code)}</div>
        </div>
      </div>
      <div>
        <p>An order comfirmation will be sent to you at {order.email}</p>
      </div>
    </div>
  );
};

export default Payment;
