import { useFormik } from "formik"
import { useState } from "react"
import Validator from "../utils/validator"
import { useCart } from "./use-cart"
import { useCustomer } from "./use-customer"
import { useMedusa } from "./use-medusa"

export const useCheckout = (sameBilling = true) => {
  const client = useMedusa()
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null)

  const {
    cart,
    actions: { updateCart },
  } = useCart()

  const { customer } = useCustomer()

  const contactForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: customer?.email ?? cart?.email ?? "",
    },
    validationSchema: Validator.checkout.contactSchema,
    onSubmit: async (values, { setStatus }) => {
      let error = false
      const { email } = values

      await client.carts
        .update(cart.id, { email })
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus("An error occurred")
          error = true
        })

      return error
    },
  })

  const shippingForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name ?? "",
      last_name: customer?.last_name ?? "",
      company: "",
      address_1: "",
      address_2: "",
      country_code: "",
      city: "",
      province: "",
      postal_code: "",
      phone: customer?.phone ?? "",
    },
    validationSchema: Validator.checkout.shippingSchema,
    onSubmit: async (values, { setStatus }) => {
      let error = false

      await client.carts
        .update(cart.id, { shipping_address: values })
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus("An error occurred")
          error = true
        })

      return error
    },
  })

  const billingForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      country_code: "",
      city: "",
      province: "",
      postal_code: "",
    },
    validationSchema: Validator.checkout.billingSchema,
    onSubmit: async (values, { setStatus }) => {
      let error = false

      await client.carts
        .update(cart.id, { billing_address: values })
        .then(({ cart }) => updateCart(cart))
        .catch(_err => {
          setStatus("An error occurred")
          error = true
        })

      return error
    },
  })

  const setShippingOption = async () => {
    let error = false

    await client.carts
      .addShippingMethod(cart.id, {
        option_id: selectedShippingMethod.id,
      })
      .then(({ cart }) => updateCart(cart))
      .catch(_err => {
        error = true
      })

    return error
  }

  const clearShippingMethod = () => {
    setSelectedShippingMethod(null)
  }

  const setupCheckout = async () => {
    const contactError = await contactForm.submitForm()

    if (contactError) {
      return false
    }

    const shippingError = await shippingForm.submitForm()

    if (shippingError) {
      return false
    }

    if (!sameBilling) {
      const billingError = await billingForm.submitForm()

      if (billingError) {
        return false
      }
    }

    if (!selectedShippingMethod) {
      return false
    }

    const shippingMethodError = await setShippingOption()

    if (shippingMethodError) {
      return false
    }

    return true
  }

  return {
    forms: {
      contactForm,
      billingForm,
      shippingForm,
    },
    shippingMethod: {
      selectedShippingMethod,
      setSelectedShippingMethod,
      clearShippingMethod,
    },
    setupCheckout,
  }
}
