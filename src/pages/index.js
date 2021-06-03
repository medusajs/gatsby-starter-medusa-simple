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
const headingAccentStyles = {
  color: "#663399",
};
const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
};
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
};

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
};

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
};

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
};

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
};

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
};

// data
const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial/",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
    color: "#E95800",
  },
  {
    text: "How to Guides",
    url: "https://www.gatsbyjs.com/docs/how-to/",
    description:
      "Practical step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done.",
    color: "#1099A8",
  },
  {
    text: "Reference Guides",
    url: "https://www.gatsbyjs.com/docs/reference/",
    description:
      "Nitty-gritty technical descriptions of how Gatsby works. Most useful when you need detailed information about Gatsby's APIs.",
    color: "#BC027F",
  },
  {
    text: "Conceptual Guides",
    url: "https://www.gatsbyjs.com/docs/conceptual/",
    description:
      "Big-picture explanations of higher-level Gatsby concepts. Most useful for building understanding of a particular topic.",
    color: "#0D96F2",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
    color: "#8EB814",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    badge: true,
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
    color: "#663399",
  },
];

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
