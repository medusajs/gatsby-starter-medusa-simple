import { useFormik } from "formik"
import React from "react"
import * as Yup from "yup"
import { useCart } from "../../../hooks/use-cart"
import Field from "../forms/field"

const DiscountField = () => {
  const {
    actions: { addDiscount },
  } = useCart()

  const discountForm = useFormik({
    initialValues: {
      discount_code: "",
    },
    validationSchema: Yup.object({
      discount_code: Yup.string().required("Discount code can't be empty"),
    }),
    onSubmit: async values => {
      console.log(values)
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    discountForm.handleSubmit()
  }

  return (
    <div>
      <p className="font-semibold text-sm mb-2">Discount code</p>
      <div className="flex items-start">
        <Field
          name={"discount_code"}
          defaultValue={discountForm.values.discount_code}
          formik={discountForm}
        />
        <div className="mx-2" />
        <button className="btn-ui" onClick={handleSubmit}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default DiscountField
