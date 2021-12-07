import React, { useEffect, useState } from "react"
import AccountLayout from "../../components/domains/account/account-layout"
import OrderHistoryEntry from "../../components/domains/orders/order-history-entry"
import SearchEngineOptimization from "../../components/seo"
import { useCustomer } from "../../hooks/use-customer"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  const {
    customer,
    loading,
    actions: { retrieveOrders },
  } = useCustomer()

  useEffect(() => {
    const getOrders = async () => {
      if (!loading && customer) {
        const orderResponse = await retrieveOrders()

        if (orderResponse) {
          setOrders(orderResponse)
        }
      }
    }

    getOrders()
  }, [loading, customer, retrieveOrders])

  return (
    <AccountLayout>
      <SearchEngineOptimization title="Order History" />
      <div className="bg-white shadow rounded-lg p-8">
        <div className="mb-6">
          <h1 className="text-xl">Order History</h1>
          <p className="text-sm font-light">
            View the status of recent orders, and manage returns.
          </p>
        </div>
        <div>
          {orders.map(order => {
            return (
              <div key={order.display_number} className="mb-10 last:mb-0">
                <OrderHistoryEntry order={order} />
              </div>
            )
          })}
        </div>
      </div>
    </AccountLayout>
  )
}

export default OrderHistory
