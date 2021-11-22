import React, { useContext, useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import StoreContext from "../../context/store-context";
import * as styles from "../../styles/product.module.css";
import { createClient } from "../../utils/client";
import { formatPrices } from "../../utils/format-price";
import { getSlug, resetOptions } from "../../utils/helper-functions";

const Product = ({ location }) => {
  const { cart, addVariantToCart } = useContext(StoreContext);
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  const [product, setProduct] = useState(undefined);
  const client = createClient();

  useEffect(() => {
    const getProduct = async () => {
      const slug = getSlug(location.pathname);
      const response = await client.products.retrieve(slug);
      setProduct(response.product);
    };

    getProduct();
  }, [location.pathname]);

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
  }, [product]);

  const handleQtyChange = (action) => {
    if (action === "inc") {
      if (
        options.quantity <
        product.variants.find(({ id }) => id === options.variantId)
          .inventory_quantity
      )
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity + 1,
          size: options.size,
        });
    }
    if (action === "dec") {
      if (options.quantity > 1)
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity - 1,
          size: options.size,
        });
    }
  };

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    });
    if (product) setOptions(resetOptions(product));
  };

  return product && cart.id ? (
    <div className={styles.container}>
      <figure className={styles.image}>
        <div className={styles.placeholder}>
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={product.thumbnail}
            alt={`${product.title}`}
          />
        </div>
      </figure>
      <div className={styles.info}>
        <span />
        <div>
          <div className="title">
            <h1>{product.title}</h1>
          </div>
          <p className="price">{formatPrices(cart, product.variants[0])}</p>
          <div className={styles.selection}>
            <p>Select Size</p>
            <div className="selectors">
              {product.variants
                .slice(0)
                .reverse()
                .map((v) => {
                  return (
                    <button
                      key={v.id}
                      className={`${styles.sizebtn} ${
                        v.title === options.size ? styles.selected : null
                      }`}
                      onClick={() =>
                        setOptions({
                          variantId: v.id,
                          quantity: options.quantity,
                          size: v.title,
                        })
                      }
                    >
                      {v.title}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className={styles.selection}>
            <p>Select Quantity</p>
            <div className={styles.qty}>
              <button
                className={styles.qtybtn}
                onClick={() => handleQtyChange("dec")}
              >
                -
              </button>
              <span className={styles.ticker}>{options.quantity}</span>
              <button
                className={styles.qtybtn}
                onClick={() => handleQtyChange("inc")}
              >
                +
              </button>
            </div>
          </div>
          <button className={styles.addbtn} onClick={() => handleAddToBag()}>
            <span>Add to bag</span>
            <BiShoppingBag />
          </button>
          <div className={styles.tabs}>
            <div className="tab-titles">
              <button className={styles.tabtitle}>Product Description</button>
            </div>
            <div className="tab-content">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Product;
