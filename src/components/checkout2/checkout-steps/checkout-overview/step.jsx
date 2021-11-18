import { Button, Flex, Text } from "@theme-ui/components";
import React from "react";
import { useCheckout } from "../../../../hooks/useCheckout";

const Step = ({ step, label, text }) => {
  const {
    actions: { updateStep },
  } = useCheckout();
  return (
    <Flex variant="layouts.spaceBetween">
      <Flex
        sx={{
          alignItems: "center",
        }}
      >
        <Text
          sx={{
            width: "150px",
          }}
        >
          {label}
        </Text>
        <Text>{text}</Text>
      </Flex>
      <Button variant="edit" onClick={() => updateStep(step)}>
        Edit
      </Button>
    </Flex>
  );
};

export default Step;
