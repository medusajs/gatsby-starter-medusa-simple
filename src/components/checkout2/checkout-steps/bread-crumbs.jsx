import { Flex, Text } from "@theme-ui/components";
import React from "react";
import { useCheckout } from "../../../hooks/useCheckout";

const BreadCrumbs = () => {
  const { activeStep, possibleSteps } = useCheckout();
  return (
    <Flex variant="layouts.breadCrumbs">
      {possibleSteps.map((step, index) => {
        const isCurrent = step === activeStep;
        return (
          <Text key={index} className={`crumb ${isCurrent ? "current" : ""}`}>
            {step}
          </Text>
        );
      })}
    </Flex>
  );
};

export default BreadCrumbs;
