import React, { useMemo } from "react";
import { Box } from "@theme-ui/components";
import { useCheckout } from "../../../hooks/useCheckout";

import InformationStep from "./information";
import CheckoutOverview from "./checkout-overview";

const CheckoutSteps = () => {
  const { activeStep, possibleSteps } = useCheckout();
  const view = useMemo(() => {
    switch (activeStep) {
      case "INFORMATION":
        return <InformationStep />;
      case "SHIPPING":
        return <Box>Shipping</Box>;
      case "PAYMENT":
        return <Box>Payment</Box>;
      case "REVIEW":
        return <Box>Review</Box>;
      default:
        break;
    }
  }, [activeStep]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: ["100%", "50%", "70%"],
        overflowY: "scroll",
        mr: 1,
        pr: 5,
      }}
    >
      <CheckoutOverview />
      {view}
    </Box>
  );
};

export default CheckoutSteps;
