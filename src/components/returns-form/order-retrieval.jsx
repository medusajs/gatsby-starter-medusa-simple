import { Button, Flex, Text } from "@theme-ui/components";
import { useFormik } from "formik";
import React from "react";
import { useReturn } from "../../hooks/useReturn";
import { Validator } from "../../utils/validator";
import Field from "../forms/field";

const OrderRetrieval = () => {
  const {
    actions: { fetchOrder },
  } = useReturn();

  const formik = useFormik({
    initialValues: {
      display_id: "",
      email: "",
    },
    validationSchema: Validator.returns.OrderRetrievalSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus({ success: true });
      const response = await fetchOrder({
        display_id: values.display_id,
        email: values.email,
      });

      console.log(response);
    },
  });

  console.log(formik.errors);
  return (
    <Flex
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      sx={{
        flexDirection: "column",
      }}
    >
      <Text as="h1" variant="accountDomain">
        Create return
      </Text>
      <Text>
        Please provide your order number, email address, and postal code to
        proceed to the next step
      </Text>
      <Field
        formik={formik}
        placeholder="Order number"
        defaultValue={formik.values.display_id}
        name="display_id"
      />
      <Field
        formik={formik}
        placeholder="Email"
        defaultValue={formik.values.email}
        name="email"
      />
      <Button>Continue</Button>
    </Flex>
  );
};

export default OrderRetrieval;
