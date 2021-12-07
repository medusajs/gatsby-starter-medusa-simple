import { navigate } from "gatsby"
import React, { useEffect } from "react"
import { useCart } from "../../../../hooks/use-cart"
import { formatPrice } from "../../../../utils/format-price"

const ManualPayment = ({ setPaymentSession, prePayment }) => {
  const {
    actions: { completeCart },
  } = useCart()

  const handleTestPayment = async () => {
    const validCheckout = await prePayment()

    if (validCheckout) {
      await setPaymentSession().then(async cart => {
        if (cart) {
          const order = await completeCart(cart.id)

          if (order) {
            navigate("/order-confirmed", { state: { order } })
          }
        }
      })
    }
  }

  useEffect(() => {
    console.warn(
      "🚧 This is a test payment, and is for testing purposes only. Look at the Medusa documentation on how to use one of our existing payment plugins or how to implement one: https://docs.medusajs.com/guides/plugins"
    )
  }, [])

  const { cart } = useCart()

  return (
    <div className="py-4 flex flex-col">
      <div
        role="alert"
        className="flex items-center text-gray-700 text-xs bg-red-300 px-4 py-2 rounded-md"
      >
        <div className="bg-red-400 text-white w-4 h-4 rounded-lg text-center mr-2">
          !
        </div>
        <span>
          This is for testing purposes only, and should not be used in a
          production environment.
        </span>
      </div>
      <button className="btn-ui mt-4" onClick={handleTestPayment}>
        Pay {cart && formatPrice(cart.total, cart.region.currency_code)}
      </button>
    </div>
  )
}

export default ManualPayment
