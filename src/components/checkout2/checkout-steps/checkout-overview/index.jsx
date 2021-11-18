import React, { useMemo } from "react";
import { Box, Card, Divider, Flex } from "@theme-ui/components";
import { useCheckout } from "../../../../hooks/useCheckout";
import { useCart } from "../../../../hooks/useCart";
import Step from "./step";

const CheckoutOverview = () => {
  const { activeStep } = useCheckout();
  const { cart } = useCart();

  const contact = useMemo(() => {
    return `${cart?.shipping_address?.first_name} ${cart?.shipping_address?.last_name}`;
  }, [cart?.shipping_address?.first_name, cart?.shipping_address?.last_name]);

  const sendTo = useMemo(() => {
    return `${cart?.shipping_address?.address_1}, ${cart?.shipping_address?.postal_code} ${cart?.shipping_address?.city}`;
  }, [
    cart?.shipping_address?.address_1,
    cart?.shipping_address?.postal_code,
    cart?.shipping_address?.city,
  ]);

  return activeStep !== "INFORMATION" ? (
    <Card variant="container">
      {activeStep === "PAYMENT" || activeStep === "SHIPPING" ? (
        <>
          <Step label="Contact" text={contact} step="INFORMATION" />
          <Divider color="faded" />
          <Step label="Send to" text={sendTo} step="INFORMATION" />
        </>
      ) : null}
    </Card>
  ) : null;
};

export default CheckoutOverview;
