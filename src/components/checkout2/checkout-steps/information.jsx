import { Box, Flex, Select, Label, Text, Button } from "@theme-ui/components";
import React, { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import { useGetAllCountries } from "../../../hooks/useGetAllCountries";
import { useCustomer } from "../../../hooks/useCustomer";
import { useCheckout } from "../../../hooks/useCheckout";
import { useFormik } from "formik";
import { Validator } from "../../../utils/validator";
import FieldWrapper from "../../forms/field-wrapper";

const InformationStep = () => {
  const {
    cart,
    actions: { updateCart },
  } = useCart();
  const {
    actions: { updateStep },
  } = useCheckout();
  const { customer } = useCustomer();
  const countries = useGetAllCountries();

  const [shippingAddress, setShippingAddress] = useState(undefined);

  useEffect(() => {
    if (cart?.shipping_address?.address_1) {
      setShippingAddress(cart.shipping_address);
      return;
    }

    if (customer?.shipping_addresses?.[0]?.address_1) {
      setShippingAddress(customer.shipping_addresses[0]);
      return;
    }
  }, [cart, customer]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: cart?.email || customer?.email || "",
      first_name: shippingAddress?.first_name || customer?.first_name || "",
      last_name: shippingAddress?.last_name || customer?.last_name || "",
      address_1: shippingAddress?.address_1 || "",
      address_2: shippingAddress?.address_2 || "",
      city: shippingAddress?.city || "",
      postal_code: shippingAddress?.postal_code || "",
      country_code: shippingAddress?.country_code || "",
      province: shippingAddress?.province || "",
      phone: shippingAddress?.phone || customer?.phone || "",
    },
    validationSchema: Validator.checkout.InformationSchema,
    onSubmit: async (values, { setStatus }) => {
      const { email, ...rest } = values;
      const response = await updateCart({
        email: email,
        shipping_address: rest,
        billing_address: rest,
      });

      if (response.error) {
        setStatus(response.error);
        return;
      }

      updateStep("SHIPPING");
    },
  });

  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      variant="layouts.form"
    >
      <Flex
        sx={{
          flexDirection: "column",
          mb: 4,
        }}
      >
        <Text as="h2" variant="accountDomain">
          Your information
        </Text>
        <FieldWrapper
          formik={formik}
          name="first_name"
          defaultValue={formik.values.first_name}
          placeholder="First name"
          label="First name"
        />
        <FieldWrapper
          formik={formik}
          name="last_name"
          defaultValue={formik.values.last_name}
          placeholder="Last name"
          label="Last name"
        />
        <FieldWrapper
          formik={formik}
          name="email"
          defaultValue={formik.values.email}
          placeholder="Email"
          label="Email"
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Text as="h2" variant="accountDomain">
          Delivery address
        </Text>
        <FieldWrapper
          formik={formik}
          name="address_1"
          defaultValue={formik.values.address_1}
          placeholder="Address 1"
          label="Address 1"
        />
        <FieldWrapper
          formik={formik}
          name="address_2"
          defaultValue={formik.values.address_2}
          placeholder="Address 2 (optional)"
          label="Address 2"
        />
        <FieldWrapper
          formik={formik}
          name="city"
          defaultValue={formik.values.city}
          placeholder="City"
          label="City"
        />
        <FieldWrapper
          formik={formik}
          name="postal_code"
          defaultValue={formik.values.postal_code}
          placeholder="Postal code"
          label="Postal code"
        />
        <Box>
          <Label
            sx={{
              mb: 2,
            }}
          >
            Country
          </Label>
          <Select
            defaultValue={formik.values.country_code}
            name="country_code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="underlined"
          >
            {countries.map((c) => {
              return (
                <option key={c.id} value={c.iso_2}>
                  {c.display_name}
                </option>
              );
            })}
          </Select>
        </Box>
        <FieldWrapper
          formik={formik}
          name="province"
          defaultValue={formik.values.province}
          placeholder="Province (optional)"
          label="Province"
        />
        <FieldWrapper
          formik={formik}
          name="phone"
          defaultValue={formik.values.phone}
          placeholder="Phone (Optional)"
          label="Phone"
        />
      </Flex>
      <Flex
        sx={{
          mt: 3,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="save">Next</Button>
      </Flex>
    </Box>
  );
};

export default InformationStep;
