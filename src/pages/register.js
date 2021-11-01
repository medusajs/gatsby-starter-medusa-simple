import { Box, Button, Flex, Text } from "@theme-ui/components";
import Field from "../components/forms/field";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCustomer } from "../hooks/useCustomer";
import { navigate } from "gatsby-link";
import ErrorSummary from "../components/forms/error-summary";

const Register = () => {
  const {
    actions: { createCustomer },
  } = useCustomer();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Not a valid email").required("Required"),
      phone: Yup.string().optional(),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await createCustomer(values);

      if (response.error) {
        setStatus(response.error.message);
        return;
      }

      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.submitForm();
  };
  return (
    <Box as="form">
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Text>
          Create
          <br />
          Account
        </Text>
        <ErrorSummary errors={formik.errors} status={formik.status} />
        <Field
          formik={formik}
          name="first_name"
          value={formik.values.first_name}
          placeholder="First name"
        />
        <Field
          formik={formik}
          name="last_name"
          value={formik.values.last_name}
          placeholder="Last name"
        />
        <Field
          formik={formik}
          name="email"
          value={formik.values.email}
          placeholder="Email"
        />
        <Field
          formik={formik}
          name="phone"
          value={formik.values.phone}
          placeholder="Phone (optional)"
        />
        <Field
          formik={formik}
          name="password"
          value={formik.values.password}
          placeholder="Password"
          type="password"
        />
        <Button onClick={handleSubmit}>Sign up</Button>
      </Flex>
    </Box>
  );
};

export default Register;
