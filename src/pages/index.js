import React, { useEffect, useState } from "react";

import Medusa from "../services/medusa";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const paragraphStyles = {
  marginBottom: 48,
};

const contentStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const cartStyles = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const productListStyles = {
  flex: 1,
};

// markup
const IndexPage = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  useEffect(() => {
    let cartId;
    if (localStorage) {
      cartId = localStorage.getItem("cart_id");
    }

    if (cartId) {
      Medusa.cart.retrieve(cartId).then(({ data }) => {
        setCart(data.cart);
      });
    } else {
      Medusa.cart.create(cartId).then(({ data }) => {
        setCart(data.cart);
        if (localStorage) {
          localStorage.setItem("cart_id", data.cart.id);
        }
      });
    }

    Medusa.products.list().then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  const handleAddToCart = (variantId) => {
    if (cart && cart.id) {
      Medusa.cart.lineItems
        .create(cart.id, {
          variant_id: variantId,
          quantity: 1,
        })
        .then(({ data }) => {
          setCart(data.cart);
        });
    }
  };
  const handleRemoveFromCart = (lineId) => {
    if (cart && cart.id) {
      Medusa.cart.lineItems.delete(cart.id, lineId).then(({ data }) => {
        setCart(data.cart);
      });
    }
  };

  return (
    <main style={pageStyles}>
      <title>Medusa Home</title>
      <h1 style={headingStyles}>Welcome to Medusa!</h1>
      <p style={paragraphStyles}></p>
      <div style={contentStyles}>
        <div style={productListStyles}>
          <h2>Products</h2>
          {products.map((p) => {
            return (
              <div key={p.id}>
                <strong>{p.title}</strong>
                <p>{p.description}</p>
                <button onClick={() => handleAddToCart(p.variants[0].id)}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
        <div style={cartStyles}>
          <h2>Cart</h2>

          <div>
            {cart.items?.map((i) => {
              return (
                <div key={i.id}>
                  <strong>{i.title}</strong>
                  <p>
                    {i.quantity} x {(i.unit_price / 100).toFixed(2)}{" "}
                    {cart.region.currency_code?.toUpperCase()}
                  </p>
                  <button onClick={() => handleRemoveFromCart(i.id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
