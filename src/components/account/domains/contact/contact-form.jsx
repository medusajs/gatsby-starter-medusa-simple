import React, { useState } from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import { Box, Flex, Grid, Label, Text, Button } from "@theme-ui/components";
import Field from "../../../forms/field";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const [editable, setEditable] = useState(false);
  const {
    customer,
    actions: { updateCustomerDetails },
  } = useCustomer();
  const formik = useFormik({
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

      setEditable(false);
    },
  });
  return (
    <Flex
      sx={{
        flexDirection: "column",
        maxWidth: "800px",
      }}
    >
      <Text
        as="h1"
        sx={{
          fontWeight: 400,
          fontSize: [3, 4, 5],
          mb: 3,
        }}
      >
        Contact Information
      </Text>
      <Box
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        <Grid
          sx={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: [4],
          }}
        >
          <Box>
            <Label
              sx={{
                mb: 2,
              }}
            >
              First name
            </Label>
            <Field
              formik={formik}
              name="first_name"
              defaultValue={formik.values.first_name}
              placeholder="First name"
              readOnly={!editable}
              sx={{
                flexGrow: "1",
              }}
            />
          </Box>
          <Box>
            <Label
              sx={{
                mb: 2,
              }}
            >
              Last name
            </Label>
            <Field
              formik={formik}
              name="last_name"
              defaultValue={formik.values.last_name}
              placeholder="Last name"
              readOnly={!editable}
              sx={{
                flexGrow: 1,
              }}
            />
          </Box>
          <Box>
            <Label
              sx={{
                mb: 2,
              }}
            >
              Email
            </Label>
            <Field
              formik={formik}
              name="email"
              defaultValue={formik.values.email}
              placeholder="Email"
              readOnly={!editable}
              sx={{
                flexGrow: 1,
              }}
            />
          </Box>
          <Box>
            <Label
              sx={{
                mb: 2,
              }}
            >
              Phone
            </Label>
            <Field
              formik={formik}
              name="phone"
              defaultValue={formik.values.phone}
              placeholder="Phone"
              readOnly={!editable}
              sx={{
                flexGrow: 1,
              }}
            />
          </Box>
        </Grid>
        <Flex
          sx={{
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          {editable ? (
            <Button>Save</Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setEditable(true);
              }}
            >
              Edit
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ContactForm;
