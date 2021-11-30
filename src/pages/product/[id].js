import {
  useProduct,
  useBag,
  convertToLocale,
  calculateVariantPrice,
} from "@medusajs/medusa-hooks";
import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import * as styles from "../../styles/product.module.css";
import { getSlug } from "../../utils/helper-functions";
import { isEmpty } from "lodash";

const Product = ({ location }) => {
  const slug = getSlug(location.pathname);
  const { addItem, region } = useBag();
  const { product, isFetching } = useProduct(slug);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const selectVariant = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  useEffect(() => {
    if (product) {
      setSelectedVariant(product?.variants[0]);
    }
  }, [product]);

  const handleAddToBag = () => {
    addItem({
      variant: {
        ...selectedVariant,
        product,
      },
      quantity,
    });
  };

  return !isFetching && !isEmpty(region) ? (
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
          <p className="price">
            {convertToLocale({
              amount: calculateVariantPrice(product.variants[0], region),
              currency_code: region.currency_code,
            })}
          </p>
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
                        selectedVariant?.id === v.id ? styles.selected : null
                      }`}
                      onClick={() => selectVariant(v)}
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
                onClick={() =>
                  setQuantity((quantity) => Math.max(quantity - 1, 1))
                }
              >
                -
              </button>
              <span className={styles.ticker}>{quantity}</span>
              <button
                className={styles.qtybtn}
                onClick={() =>
                  setQuantity((quantity) =>
                    Math.min(quantity + 1, selectedVariant?.inventory_quantity)
                  )
                }
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
