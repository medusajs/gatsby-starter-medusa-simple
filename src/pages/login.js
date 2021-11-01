import { Button, Flex, Text } from "@theme-ui/components";
import Field from "../components/forms/field";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorSummary from "../components/forms/error-summary";
import { useCustomer } from "../hooks/useCustomer";
import { navigate } from "gatsby-link";
import Link from "../components/link/link";

const Login = () => {
  const {
    customer,
    actions: { loginCustomer },
  } = useCustomer();

  useEffect(() => {
    const checkLogin = async () => {
      if (customer) {
        navigate("/");
      }
    };

    checkLogin();
  }, [customer]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a valid email")
        .required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { setStatus }) => {
      const response = await loginCustomer(values);

      if (response.error) {
        response.error.message
          ? setStatus(response.error.message)
          : setStatus("Failed");
        return;
      }

      navigate("/customer");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.submitForm();
  };
  return (
    <Flex
      as="form"
      sx={{
        height: "calc(100vh - 80px)",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          flexGrow: 1,
          maxWidth: "500px",
        }}
      >
        <Text as="h1" sx={{}}>
          Welcome back
        </Text>
        <Text
          sx={{
            my: 2,
            color: "darkgrey",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            sx={{
              color: "medusaGreen",
            }}
          >
            Sign up
          </Link>
        </Text>
        <ErrorSummary errors={formik.errors} status={formik.status} />
        <Field
          formik={formik}
          name="email"
          defaultValue={formik.values.email}
          placeholder="Email"
          sx={{
            mt: 3,
          }}
        />
        <Field
          formik={formik}
          name="password"
          defaultValue={formik.values.password}
          placeholder="Password"
          type="password"
          sx={{
            my: 3,
          }}
        />
        <Button onClick={handleSubmit} disabled={formik.isSubmitting}>
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
