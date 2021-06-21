import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../context/store-context";
import { formatPrice, getSlug } from "../../utils/helperFunctions";
import CheckoutItem from "../../components/checkout/summery/checkoutItem";
import { Link } from "gatsby";

const Order = ({ location }) => {
  const { createCart, retrieveOrder } = useContext(StoreContext);
  const [order, setOrder] = useState();

  useEffect(() => {
    if (location.pathname) {
      retrieveOrder(getSlug(location.pathname)).then((data) => setOrder(data));
    }
  }, [location.pathname]);

  useEffect(() => {
    createCart();
  }, []);

  return order ? (
    <div className="order-container">
      <Link to="/" className="logo order-logo">
        medusa
      </Link>
      <div className="flex-column order-summery">
        <div className="align-center flex-column">
          <h1 className="p-y1">Order Summery</h1>
          <p>Thank you for your order!</p>
        </div>
        {order.items.map((i) => {
          return (
            <div key={i.id} className="p-y1">
              <CheckoutItem {...i} />
            </div>
          );
        })}
        <div className="my-1">
          <div className="flex-row justify-between">
            <div>Subtotal</div>
            <div>{formatPrice(order.subtotal, order.region.currency_code)}</div>
          </div>
          <div className="flex-row justify-between p-y1">
            <div>Shipping</div>
            <div>
              {formatPrice(order.shipping_total, order.region.currency_code)}
            </div>
          </div>
          <div className="flex-row justify-between total p-y1">
            <div>Total</div>
            <div>{formatPrice(order.total, order.region.currency_code)}</div>
          </div>
        </div>
        <div>
          <p>An order comfirmation will be sent to you at {order.email}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Order;
