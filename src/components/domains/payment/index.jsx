import React, { useCallback, useEffect } from "react"
import { useCart } from "../../../hooks/use-cart"
import ManualPayment from "./manual-payment"
import StripePayment from "./stripe-payment"

const Payment = ({ setupCheckout }) => {
  const {
    cart,
    loading,
    actions: { setPaymentSession, createPaymentSession },
  } = useCart()

  const initPaymentSession = useCallback(async () => {
    if (
      loading ||
      !cart?.id ||
      (cart?.payment_sessions && cart.payment_sessions.length > 0)
    ) {
      return
    }

    if (!loading && cart.id) {
      await createPaymentSession(cart.id)
    }
  }, [cart?.id, cart?.payment_session, loading])

  useEffect(() => {
    const init = async () => {
      await initPaymentSession()
    }

    init()
  }, [initPaymentSession])
  return (
    <div>
      <h2>Payment</h2>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map(ps => {
          switch (ps.provider_id) {
            case "stripe":
              return (
                <StripePayment
                  key="stripe"
                  setPaymentSession={() => setPaymentSession(cart.id, "stripe")}
                  prePayment={setupCheckout}
                />
              )
            case "manual":
              return (
                <ManualPayment
                  key="manual"
                  setPaymentSession={() => setPaymentSession(cart.id, "manual")}
                  prePayment={setupCheckout}
                />
              )
            default:
              return null
          }
        })}
    </div>
  )
}

export default Payment
