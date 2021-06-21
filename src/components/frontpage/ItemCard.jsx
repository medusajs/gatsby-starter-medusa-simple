import { Link } from "gatsby";
import React from "react";

const ItemDisplay = (props) => {
  return (
    <div key={props.id} className="item-card">
      <Link to={`/item/${props.id}`}>
        <div className="item-info flex-column">
          <h2 className="product-title">{props.title}</h2>
          <p className="product-price">19.50 EUR</p>
        </div>
      </Link>
    </div>
  );
};

export default ItemDisplay;
