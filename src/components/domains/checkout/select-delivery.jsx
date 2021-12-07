import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useCart } from "../../../hooks/use-cart"
import DeliveryMethod from "../shipping/delivery-method"

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
      console.log(options)
      if (_.isEmpty(options)) {
        setError("No shipping options available")
        return
      }

      if (options && options.length === 1) {
        setSelectedShippingMethod(options[0].id)
      }

      setShippingOptions(options)
    })
  }, [cart?.id, setSelectedShippingMethod, getShippingOptions])

  return (
    <div>
      <h2>Delivery method</h2>
      <div className="flex items-center mt-4">
        {!error &&
          shippingOptions.map(shippingOption => {
            return (
              <DeliveryMethod
                key={shippingOption.id}
                method={shippingOption}
                currencyCode={cart?.region?.currency_code}
                isSelected={selectedShippingMethod === shippingOption.id}
                onSelect={() => setSelectedShippingMethod(shippingOption.id)}
              />
            )
          })}
        {error && (
          <span role="alert" className="text-red-500">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}

export default SelectDelivery
