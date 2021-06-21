import React, { useContext, useState, useEffect } from "react";
import DisplayContext from "../../../context/display-context";
import StoreContext from "../../../context/store-context";
import CheckoutInput from "./checkoutInput";

const InformationModule = () => {
  const { updateCheckoutStep } = useContext(DisplayContext);
  const { cart, updateAddress } = useContext(StoreContext);
  const [customerInfo, setCustomerInfo] = useState({
    address_1: "",
    address_2: "",
    city: "",
    country_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    postal_code: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const address = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      address_1: e.target.address_1.value,
      address_2: e.target.address_2.value,
      city: e.target.city.value,
      postal_code: e.target.postal_code.value,
      country_code: e.target.country_code.value,
      phone: e.target.phone.value,
    };

    updateAddress(address, email);

    updateCheckoutStep(2);
  };

  useEffect(() => {
    if (cart.shipping_address && cart.email) {
      setCustomerInfo({
        address_1: cart.shipping_address.address_1,
        address_2: cart.shipping_address.address_2,
        city: cart.shipping_address.city,
        postal_code: cart.shipping_address.postal_code,
        country_code: cart.shipping_address.country_code,
        first_name: cart.shipping_address.first_name,
        last_name: cart.shipping_address.last_name,
        email: cart.email,
        phone: cart.shipping_address.phone,
      });
    }
  }, [cart]);

  const infoInputs = [
    [
      {
        type: "text",
        name: "email",
        placeholder: "Email",
        required: true,
        value: customerInfo.email,
      },
    ],
    [
      {
        type: "text",
        name: "phone",
        placeholder: "Phone",
        required: true,
        value: customerInfo.phone,
      },
    ],
  ];
  const shippingInputs = [
    [
      {
        type: "text",
        name: "first_name",
        placeholder: "First name",
        required: true,
        value: customerInfo.first_name,
      },
      {
        type: "text",
        name: "last_name",
        placeholder: "Last name",
        required: true,
        value: customerInfo.last_name,
      },
    ],
    [
      {
        type: "text",
        name: "address_1",
        placeholder: "Address 1",
        required: true,
        value: customerInfo.address_1,
      },
    ],
    [
      {
        type: "text",
        name: "address_2",
        placeholder: "Address 2",
        form: "address",
        value: customerInfo.address_2,
      },
    ],
    [
      {
        type: "text",
        name: "city",
        placeholder: "City",
        required: true,
        value: customerInfo.city,
      },
      {
        type: "text",
        name: "postal_code",
        placeholder: "Postal code",
        required: true,
        value: customerInfo.postal_code,
      },
    ],
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4 className="checkout-header">Contact</h4>
        {infoInputs.map((inp, i) => {
          return (
            <div key={i}>
              <CheckoutInput inputArr={inp} />
            </div>
          );
        })}
      </div>
      <div>
        <h4 className="checkout-header">Delivery Address</h4>
        {shippingInputs.map((inp, i) => {
          return (
            <div key={i}>
              <CheckoutInput inputArr={inp} />
            </div>
          );
        })}
        {cart.region && (
          <select
            className="row-wrapper full-row country-selector"
            name="country_code"
            value={customerInfo.country_code}
            required={true}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, country_code: e.target.value })
            }
          >
            <option value="" disabled defaultValue>
              Country
            </option>
            {cart.region.countries.map((c) => {
              return (
                <option className="option" key={c.id} value={c.iso_2}>
                  {c.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className="flex-row justify-between checkout-controls">
        <span />
        <button className="big-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default InformationModule;
