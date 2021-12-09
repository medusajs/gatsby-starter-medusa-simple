import React, { useEffect, useState } from "react"
import Field from "../components/domains/forms/field"
import SplitField from "../components/domains/forms/split-field"
import OrderBulletin from "../components/domains/orders/order-bulletin"
import ReturnSummary from "../components/domains/returns/return-summary"
import SelectExchangeItem from "../components/domains/returns/select-exchange-item"
import SelectReturnItem from "../components/domains/returns/select-return-item"
import SelectReturnQuantity from "../components/domains/returns/select-return-quantity"
import DeliveryMethod from "../components/domains/shipping/delivery-method"
import Divider from "../components/domains/utility/divider"
import Grid from "../components/domains/utility/grid"
import SearchEngineOptimization from "../components/seo"
import { useReturn } from "../hooks/use-return"

const CreateReturn = ({ location }) => {
  const [initialValues, setInitialValues] = useState(null)

  const {
    order,
    fetchOrderForm,
    returnOptions,
    selectedItems,
    selectedShipping,
    actions: {
      setOrder,
      selectItem,
      deselectItem,
      updateItemQuantity,
      setSelectedShipping,
      getExchangeOptions,
      addExchangeItem,
      removeExchangeItem,
    },
  } = useReturn(initialValues)

  useEffect(() => {
    if (location.state && location.state.order) {
      const { order: res } = location.state
      setInitialValues({ display_id: res.display_id, email: res.email })
      setOrder(res)
    }
  }, [location.state, setOrder])

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
        <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row lg:items-baseline lg:w-1/2">
          <SplitField>
            <Field
              placeholder="Order number"
              formik={fetchOrderForm}
              name="display_id"
              defaultValue={fetchOrderForm.values.display_id}
            />
            <Field
              placeholder="Email"
              formik={fetchOrderForm}
              name="email"
              autocomplete="email"
              defaultValue={fetchOrderForm.values.email}
            />
          </SplitField>
          <div className="my-3 lg:my-0 lg:mx-2" />
          <button
            className="btn-ui"
            onClick={e => {
              e.preventDefault()
              fetchOrderForm.submitForm()
            }}
          >
            Retrieve
          </button>
        </div>
      </div>
      {order ? (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
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
                          onSelect={selectItem}
                          onDeselect={deselectItem}
                        />
                      )
                    })}
                  </Grid>
                </div>
              </div>
              <Divider />
              <div>
                <h3>Quantity</h3>
                <p>
                  Select the quantity of each item you wish to return. You can
                  only return up to the quantity you purchased.
                </p>
                {selectedItems.map(item => {
                  return (
                    <div key={item.id} className="mt-4">
                      <SelectReturnQuantity
                        item={item}
                        updateQuantity={updateItemQuantity}
                      />
                    </div>
                  )
                })}
              </div>
              <Divider />
              <div>
                <h3>Exchanges</h3>
                <p className="mt-1">
                  If you wish to exchange an item, select the quantity of the
                  item aswell as the variant you wish to receive instead.
                </p>
                {selectedItems.map(item => {
                  return (
                    <div key={item.id} className="mt-4">
                      <SelectExchangeItem
                        item={item}
                        getExchangeOptions={getExchangeOptions}
                        removeExchangeItem={removeExchangeItem}
                        addExchangeItem={addExchangeItem}
                      />
                    </div>
                  )
                })}
              </div>
              <Divider />
              <div>
                <h3>Return method</h3>
                <p>
                  We recommend purchasing a shipping label to ensure there is a
                  tracking code and safe means for returning your product(s).
                </p>
                <div className="flex items-center mt-4">
                  {returnOptions.length &&
                    returnOptions.map(option => {
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
          <div className="lg:pl-16 lg:w-1/2 mt-8">
            <ReturnSummary
              items={selectedItems}
              shipping={selectedShipping}
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
