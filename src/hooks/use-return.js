import { useFormik } from "formik"
import * as Yup from "yup"

export const useReturn = (initialValues = null) => {
  const fetchOrderForm = useFormik({
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

  return { fetchOrderForm }
}
