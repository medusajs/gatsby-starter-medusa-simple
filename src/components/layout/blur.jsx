import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";

const Blur = () => {
  const { cartView, updateCartViewDisplay } = useContext(DisplayContext);
  return (
    <div
      className={`blur ${cartView ? "active" : ""}`}
      onClick={() => updateCartViewDisplay()}
      onKeyDown={() => updateCartViewDisplay()}
      role="button"
      tabIndex="-1"
      aria-label="Close cart view"
    />
  );
};

export default Blur;
