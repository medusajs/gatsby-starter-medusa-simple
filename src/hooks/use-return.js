import { useFormik } from "formik"
import * as Yup from "yup"
import { useMedusa } from "./use-medusa"

export const useReturn = (initialValues = null) => {
  const fetchOrderForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: initialValues?.email || "",
      display_id: initialValues?.display_id || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      display_id: Yup.number()
        .integer("Not a valid order number")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false)
      console.log(values)
    },
  })

  const client = useMedusa()

  const getReturnShippingOptions = async regionId => {
    const options = await client.shippingOptions
      .list({ is_return: true, region_id: regionId })
      .then(({ shipping_options }) => shipping_options)
      .catch(_ => undefined)

    return options
  }

  return { fetchOrderForm, actions: { getReturnShippingOptions } }
}
