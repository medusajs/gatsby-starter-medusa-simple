import React from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import { Box, Flex, Text, Button } from "@theme-ui/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import FieldWrapper from "../../../forms/field-wrapper";

const ContactForm = () => {
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await updateCustomerDetails(values);

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
      <Box
        variant="layouts.form"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        <Text variant="accountDomain" as="h2">
          Account information
        </Text>
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
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
          <FieldWrapper
            formik={formik}
            name="phone"
            defaultValue={formik.values.phone}
            placeholder="Phone"
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

export default ContactForm;
