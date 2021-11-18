import { Box, Button, Flex, Input, Text } from "@theme-ui/components";
import { useFormik } from "formik";
import React from "react";
import { useCart } from "../../hooks/useCart";
import CodeInput from "../forms/code-input";

const DiscountCode = () => {
  const {
    cart,
    actions: { updateCart, removeDiscount },
  } = useCart();

  const [isApplied, setIsApplied] = React.useState(
    Boolean(cart?.discounts[0]?.code)
  );

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const response = await updateCart({
        discounts: [{ code: values.code }],
      });
      if (response.error) {
        setErrors(response.error.message);
      } else {
        setIsApplied(true);
      }
    },
  });

  const handleRemove = (e) => {
    e.preventDefault();
    removeDiscount(cart?.discounts[0]);
    setIsApplied(false);
  };

  return (
    <Box>
      <CodeInput
        formik={formik}
        name="code"
        placeholder="Do you have a discount code?"
        isApplied={isApplied}
        successText="Your discount code was succesfully applied"
        handleRemove={handleRemove}
      />
    </Box>
  );
};

export default DiscountCode;
