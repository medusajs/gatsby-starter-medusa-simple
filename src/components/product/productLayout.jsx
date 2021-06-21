import React, { useContext, useEffect, useState } from "react";
import "./product.css";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineTruck } from "react-icons/hi";
import StoreContext from "../../context/store-context";
import { resetOptions } from "../../utils/helperFunctions";

const ProductLayout = (props) => {
  const { addVariantToCart } = useContext(StoreContext);
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  useEffect(() => {
    if (props) {
      setOptions(resetOptions(props));
    }
  }, [props]);

  const handleQtyChange = (action) => {
    if (action === "inc") {
      if (options.quantity < 10)
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
    if (props) setOptions(resetOptions(props));
  };

  return (
    <div className="product-session">
      <div className="product-image"></div>
      <div className="product-info">
        <div className="details">
          <div className="title">
            <h1>{props.title}</h1>
          </div>
          <div className="price">
            <span>19.50 EUR</span>
          </div>
          <div className="selection">
            <p className="option-desc">Select Size</p>
            <div className="selectors">
              {props.variants
                .slice(0)
                .reverse()
                .map((v) => {
                  return (
                    <button
                      key={v.id}
                      className={`size-btn btn ${
                        v.title === options.size ? "selected" : ""
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
          <div className="selection">
            <p className="option-desc">Select Quantity</p>
            <div className="qty-btns">
              <button
                className="qty-btn btn"
                onClick={() => handleQtyChange("dec")}
              >
                -
              </button>
              <p className="qty">{options.quantity}</p>
              <button
                className="qty-btn btn"
                onClick={() => handleQtyChange("inc")}
              >
                +
              </button>
            </div>
          </div>
          <div className="actions">
            <button
              className="add-to-cart checkout-btn big-btn"
              onClick={() => handleAddToBag()}
            >
              <span>Add to bag</span>
              <BiShoppingBag />
            </button>
          </div>
          <div className="tabs">
            <div className="tab-titles">
              <button className="tab-title active">Product Description</button>
              <button className="tab-title">About Designer</button>
            </div>
            <div className="tab-content">
              <p>{props.description}</p>
            </div>
          </div>
        </div>
        <div className="returns-msg">
          <HiOutlineTruck />
          <p>Free returns on all orders</p>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
