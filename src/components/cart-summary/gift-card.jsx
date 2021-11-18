import { Box, Button, Flex, Input, Text } from "@theme-ui/components";
import { useFormik } from "formik";
import React from "react";
import { useCart } from "../../hooks/useCart";
import CodeInput from "../forms/code-input";

const GiftCard = () => {
  const {
    cart,
    actions: { updateCart },
  } = useCart();

  const [isApplied, setIsApplied] = React.useState(
    Boolean(cart?.gift_cards?.[0])
  );

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const response = await updateCart({
        gift_cards: [{ code: values.code }],
      });
      if (response.error) {
        setErrors(response.error.message);
      } else {
        setIsApplied(true);
      }
    },
  });

  const removeGiftCard = (e) => {
    e.preventDefault();
    updateCart({ gift_cards: [] });
    setIsApplied(false);
  };

  return (
    <Box>
      <CodeInput
        formik={formik}
        name="code"
        placeholder="Do you have a gift card?"
        isApplied={isApplied}
        successText="Your gift card was succesfully applied"
        handleRemove={removeGiftCard}
      />
    </Box>
  );
};

export default GiftCard;
