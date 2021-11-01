import React from "react";
import ContactForm from "./contact-form";
import ShippingForm from "./shipping-form";

import { Flex } from "@theme-ui/components";
import BillingForm from "./billing-form";

const Contact = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <ContactForm />
      <BillingForm />
      <ShippingForm />
    </Flex>
  );
};

export default Contact;
