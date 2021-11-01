import React, { useMemo, useState } from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import {
  Box,
  Flex,
  Grid,
  Label,
  Text,
  Button,
  Select,
} from "@theme-ui/components";
import Field from "../../../forms/field";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetAllCountries } from "../../../../hooks/useGetAllCountries";

const ShippingForm = () => {
  const {
    customer,
    actions: { addShippingAddress, updateShippingAddress },
  } = useCustomer();

  const countries = useGetAllCountries();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const isSelected = useMemo(() => {
    return customer?.shipping_addresses?.[selectedIndex] ? true : false;
  }, [selectedIndex]);

  const [editable, setEditable] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name:
        customer?.shipping_addresses?.[selectedIndex]?.first_name || "",
      last_name: customer?.shipping_addresses?.[selectedIndex]?.last_name || "",
      address_1: customer?.shipping_addresses?.[selectedIndex]?.address_1 || "",
      address_2: customer?.shipping_addresses?.[selectedIndex]?.address_2 || "",
      city: customer?.shipping_addresses?.[selectedIndex]?.city || "",
      country_code:
        customer?.shipping_addresses?.[selectedIndex]?.country_code || "",
      province: customer?.shipping_addresses?.[selectedIndex]?.province || "",
      postal_code:
        customer?.shipping_addresses?.[selectedIndex]?.postal_code || "",
      phone: customer?.shipping_addresses?.[selectedIndex]?.phone || "",
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

      if (selectedIndex?.id) {
        response = await updateShippingAddress(selectedIndex.id, values);
      } else {
        response = await addShippingAddress(values);
      }

      if (response.error) {
        setStatus(response.error);
        return;
      }

      setEditable(false);
    },
  });

  const handleAddressSelect = (e) => {
    const index = e.target.value;
    setSelectedIndex(index);
  };

  const handleAddNew = () => {
    setSelectedIndex(customer?.shipping_addresses?.length);
    setEditable(true);
  };

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
        Shipping Addresses
      </Text>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {customer?.shipping_addresses.length ? (
            <Select onChange={handleAddressSelect}>
              {customer.shipping_addresses.map((sa, i) => {
                return (
                  <option
                    key={i}
                    value={i}
                  >{`${sa.address_1}, ${sa.city}`}</option>
                );
              })}
            </Select>
          ) : null}
          {!editable ? <Button onClick={handleAddNew}>Add new</Button> : null}
        </Flex>
        {isSelected ? (
          <Flex
            sx={{
              alignItems: "center",
            }}
          >
            {editable ? (
              <Button onClick={() => formik.submitForm()}>Save</Button>
            ) : (
              <>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditable(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditable(true);
                  }}
                  sx={{
                    ml: 2,
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </Flex>
        ) : null}
      </Flex>
      <Box as="form">
        {isSelected ? (
          <Grid
            sx={{
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: [4],
              my: 4,
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
                Address 1
              </Label>
              <Field
                formik={formik}
                name="address_1"
                defaultValue={formik.values.address_1}
                placeholder="Address 1"
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
                Address 2 (Optional)
              </Label>
              <Field
                formik={formik}
                name="address_2"
                defaultValue={formik.values.address_2}
                placeholder="Address 2"
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
                City
              </Label>
              <Field
                formik={formik}
                name="city"
                defaultValue={formik.values.city}
                placeholder="City"
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
                Postal code
              </Label>
              <Field
                formik={formik}
                name="postal_code"
                defaultValue={formik.values.postal_code}
                placeholder="Postal code"
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
                Country
              </Label>
              <Select
                defaultValue={formik.values.country_code}
                name="country_code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={!editable}
                sx={{
                  minHeight: "40px",
                  borderRadius: "8px",
                }}
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
            <Box>
              <Label
                sx={{
                  mb: 2,
                }}
              >
                Province (Optional)
              </Label>
              <Field
                formik={formik}
                name="province"
                defaultValue={formik.values.province}
                placeholder="Province"
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
                Phone (Optional)
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
        ) : null}
      </Box>
    </Flex>
  );
};

export default ShippingForm;
