import React from "react";
import ContactForm from "./contact-form";
import ShippingForm from "./shipping-form";

import { Divider, Flex } from "@theme-ui/components";
import PasswordForm from "./password-form";

const Contact = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <ContactForm />
      <Divider
        sx={{
          color: "faded",
          my: 4,
        }}
      />
      <ShippingForm />
      <Divider
        sx={{
          color: "faded",
          my: 4,
        }}
      />
      <PasswordForm />
    </Flex>
  );
};

export default Contact;
