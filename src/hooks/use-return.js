import { useFormik } from "formik"
import { graphql, useStaticQuery } from "gatsby"
import { useCallback, useEffect, useState } from "react"
import * as Yup from "yup"
import { useMedusa } from "./use-medusa"

export const useReturn = (initialValues = null) => {
  const client = useMedusa()

  const [order, setOrder] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [returnOptions, setReturnOptions] = useState([])
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [additionalItems, setAdditionalItems] = useState([])

  const { raw } = useStaticQuery(graphql`
    query {
      raw: allMedusaProducts {
        edges {
          node {
            id
            options {
              id
            }
            variants {
              id
              title
              options {
                value
                option_id
                id
              }
            }
          }
        }
      }
    }
  `)

  const products = raw.edges.map(({ node }) => node)

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
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)
      const orderRes = await client.orders
        .lookupOrder({ display_id: values.display_id, email: values.email })
        .then(({ order }) => order)
        .catch(_ => undefined)

      if (!orderRes) {
        setStatus("Order not found")
        setSubmitting(false)
        return
      }

      setOrder(orderRes)
    },
  })

  const getReturnShippingOptions = useCallback(async () => {
    if (order) {
      const regionId = order.region.id

      const options = await client.shippingOptions
        .list({ is_return: true, region_id: regionId })
        .then(({ shipping_options }) => shipping_options)
        .catch(_ => undefined)

      return options
    }

    return []
  }, [order, client.shippingOptions])

  const selectItem = item => {
    setSelectedItems(prevState => [...prevState, item])
  }

  const deselectItem = item => {
    const tmp = selectedItems.filter(i => i.id !== item.id)
    setSelectedItems(tmp)
  }

  const updateItemQuantity = (item, quantity) => {
    const tmp = selectedItems.map(i => {
      if (
        i.id === item.id &&
        quantity > 0 &&
        quantity <= i.fulfilled_quantity
      ) {
        return { ...i, quantity }
      }

      return i
    })

    setSelectedItems(tmp)
  }

  useEffect(() => {
    const getOptions = async () => {
      if (order) {
        const response = await getReturnShippingOptions(order.region.id)

        if (response) {
          setReturnOptions(response)
        }
      }
    }

    getOptions()
  }, [order, getReturnShippingOptions])

  const getExchangeOptions = item => {
    const {
      variant: { product_id },
      variant_id,
    } = item

    const product = products.find(p => p.id === product_id)

    if (product) {
      return product.variants.filter(v => v.id !== variant_id)
    }

    return []
  }

  const addExchangeItem = item => {
    const tmp = additionalItems.filter(i => i.id !== item.id)
    setAdditionalItems([...tmp, item])
  }

  const removeExchangeItem = item => {
    const tmp = additionalItems.filter(i => i.id !== item.id)
    setAdditionalItems(tmp)
  }

  return {
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
  }
}
