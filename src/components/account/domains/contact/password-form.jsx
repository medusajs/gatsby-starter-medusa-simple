import React from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import { Box, Flex, Text, Button } from "@theme-ui/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import FieldWrapper from "../../../forms/field-wrapper";
import { Validator } from "../../../../utils/validator";

const PasswordForm = () => {
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer();
  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Validator.account.NewPasswordSchema,
    onSubmit: async (values, { setStatus }) => {
      const response = await updateCustomerDetails({
        password: values.new_password,
      });

      console.log(response);

      if (response.error) {
        setStatus(response.error);
        return;
      }

      formik.resetForm({ new_password: "", confirm_password: "" });
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
          Password
        </Text>
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
          <FieldWrapper
            formik={formik}
            name="new_password"
            defaultValue={formik.values.new_password || ""}
            placeholder="New password"
            label="New password"
            type="password"
          />
          <FieldWrapper
            formik={formik}
            name="confirm_password"
            defaultValue={formik.values.confirm_password || ""}
            placeholder="Confirm password"
            label="Confirm password"
            type="password"
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

export default PasswordForm;
