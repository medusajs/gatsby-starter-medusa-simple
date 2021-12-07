import React from "react"
import Field from "../components/domains/forms/field"
import OrderBulletin from "../components/domains/orders/order-bulletin"
import ReturnSummary from "../components/domains/returns/return-summary"
import SelectReturnItem from "../components/domains/returns/select-return-item"
import DeliveryMethod from "../components/domains/shipping/delivery-method"
import Grid from "../components/domains/utility/grid"
import SearchEngineOptimization from "../components/seo"
import { useReturn } from "../hooks/use-return"

const CreateReturn = () => {
  const order = null
  const shipping_options = null
  const { fetchOrderForm } = useReturn()
  return (
    <div className="layout-base">
      <SearchEngineOptimization title="Create Return" />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-ui-medium pb-8">
        <div>
          <h1>Create Return</h1>
          <p className="mt-2">
            Use this form to create returns and exchange items
          </p>
        </div>
        <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row lg:items-center lg:w-1/2">
          <Field
            placeholder="Order number"
            formik={fetchOrderForm}
            name="display_id"
            defaultValue={fetchOrderForm.values.display_id}
          />
          <div className="my-2 lg:my-0 lg:mx-2" />
          <Field
            placeholder="Email"
            formik={fetchOrderForm}
            name="email"
            autocomplete="email"
            defaultValue={fetchOrderForm.values.email}
          />
          <div className="my-3 lg:my-0 lg:mx-2" />
          <button className="btn-ui">Retrieve</button>
        </div>
      </div>
      {order ? (
        <div className="flex">
          <div className="w-1/2">
            <div className="mt-8">
              <OrderBulletin order={order} cta={false} />
              <div className="mt-8">
                <h3>Select items</h3>
                <p>Select the items you wish to return</p>
                <div className="mt-4">
                  <Grid>
                    {order.items.map(item => {
                      return (
                        <SelectReturnItem
                          key={item.id}
                          item={item}
                          currencyCode={order.currency_code}
                        />
                      )
                    })}
                  </Grid>
                </div>
              </div>
              <div className="mt-8">
                <h3>Exchanges</h3>
              </div>
              <div className="mt-8">
                <h3>Return method</h3>
                <p>
                  We recommend purchasing a shipping label to ensure there is a
                  tracking code and safe means for returning your product(s).
                </p>
                <div className="flex items-center mt-4">
                  {shipping_options.map(option => {
                    return (
                      <div key={option.id} className="mr-3 last:mr-0">
                        <DeliveryMethod
                          method={option}
                          isSelected={option.name === "Return shipping"}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="pl-16 w-1/2 mt-8">
            <ReturnSummary
              items={order.items}
              currencyCode={order.currency_code}
            />
          </div>
        </div>
      ) : (
        <div className=" w-full py-24 flex items-center justify-center">
          <p>Retrieve an order to create a return</p>
        </div>
      )}
    </div>
  )
}

export default CreateReturn
