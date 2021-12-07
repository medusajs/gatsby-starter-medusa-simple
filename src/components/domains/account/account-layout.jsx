import { navigate } from "gatsby"
import React, { useEffect } from "react"
import { useCustomer } from "../../../hooks/use-customer"
import AccountNav from "./account-nav"

const AccountLayout = ({ children }) => {
  const { loading, customer } = useCustomer()

  useEffect(() => {
    if (!loading && !customer) {
      navigate("/sign-in")
    }
  }, [loading, customer])

  return (
    <div className="bg-ui">
      <div className="flex flex-col lg:flex-row layout-base py-0 lg:py-12">
        <div className="lg:mr-24 relative">
          <AccountNav />
        </div>
        <div className="flex-grow mt-4 lg:mt-0">
          {loading && !customer ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
