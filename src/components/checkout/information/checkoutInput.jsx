import React from "react";

const CheckoutInput = ({ inputArr }) => {
  return (
    <div className="form-row">
      {inputArr.length > 1 ? (
        <>
          {inputArr.map((inp, i) => {
            return (
              <div key={i} className="row-wrapper half-row">
                <input
                  type={inp.type}
                  placeholder={inp.placeholder}
                  name={inp.name}
                  className="checkout-input"
                  required={inp.required}
                  defaultValue={inp.value}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="row-wrapper full-row">
          <input
            type={inputArr[0].type}
            placeholder={inputArr[0].placeholder}
            name={inputArr[0].name}
            className="checkout-input"
            required={inputArr[0].required}
            defaultValue={inputArr[0].value}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutInput;
