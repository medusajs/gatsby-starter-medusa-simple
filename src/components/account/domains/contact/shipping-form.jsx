import React from "react";
import { useCustomer } from "../../../../hooks/useCustomer";
import { Box, Flex, Label, Text, Button, Select } from "@theme-ui/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetAllCountries } from "../../../../hooks/useGetAllCountries";
import FieldWrapper from "../../../forms/field-wrapper";

const ShippingForm = () => {
  const {
    customer,
    actions: { addShippingAddress, updateShippingAddress },
  } = useCustomer();

  const countries = useGetAllCountries();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      address_1: customer?.shipping_addresses?.[0]?.address_1 || "",
      address_2: customer?.shipping_addresses?.[0]?.address_2 || "",
      city: customer?.shipping_addresses?.[0]?.city || "",
      country_code: customer?.shipping_addresses?.[0]?.country_code || "",
      province: customer?.shipping_addresses?.[0]?.province || "",
      postal_code: customer?.shipping_addresses?.[0]?.postal_code || "",
      phone: customer?.shipping_addresses?.[0]?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      address_1: Yup.string().required(),
      address_2: Yup.string().optional(),
      city: Yup.string().required(),
      country_code: Yup.string().required(),
      province: Yup.string().optional(),
      postal_code: Yup.string().required(),
      phone: Yup.string().optional(),
    }),
    onSubmit: async (values, { setStatus }) => {
      let response;

      if (customer?.shipping_addresses?.[0]?.id) {
        response = await updateShippingAddress(
          customer.shipping_addresses[0].id,
          values
        );
      } else {
        response = await addShippingAddress(values);
      }

      if (response.error) {
        setStatus(response.error);
        return;
      }
    },
  });

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <Text variant="accountDomain" as="h2">
        Shipping information
      </Text>
      <Box variant="layouts.form" as="form" onSubmit={formik.handleSubmit}>
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
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
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button variant="save" type="submit" disabled={!formik.dirty}>
            Save
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ShippingForm;
