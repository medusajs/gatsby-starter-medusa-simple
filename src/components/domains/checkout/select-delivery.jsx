import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useCart } from "../../../hooks/use-cart"
import ShippingOptions from "../shipping/shipping-options"

const SelectDelivery = ({
  selectedShippingMethod,
  setSelectedShippingMethod,
}) => {
  const [error, setError] = useState(null)
  const [shippingOptions, setShippingOptions] = useState([])

  const {
    cart,
    actions: { getShippingOptions },
  } = useCart()

  useEffect(() => {
    if (!cart?.id) {
      return
    }

    getShippingOptions(cart.id).then(options => {
      if (_.isEmpty(options)) {
        setError("No shipping options available")
        return
      }

      if (options && options.length === 1) {
        setSelectedShippingMethod(options[0].id)
      }

      setShippingOptions(options)
    })

    return () => {
      setShippingOptions([])
    }
  }, [cart?.id, setSelectedShippingMethod, getShippingOptions])

  return (
    <div>
      {!error && shippingOptions && (
        <ShippingOptions
          title="Delivery method"
          options={shippingOptions}
          currencyCode={cart?.region?.currency_code}
          onSelect={setSelectedShippingMethod}
        />
      )}
      {error && (
        <span role="alert" className="text-red-500">
          {error}
        </span>
      )}
    </div>
  )
}

export default SelectDelivery
