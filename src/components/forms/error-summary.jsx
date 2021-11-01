import { Box, Flex, Text } from "@theme-ui/components";
import React, { useMemo } from "react";

const ErrorSummary = ({ errors, status }) => {
  const errorMessages = useMemo(() => {
    return Object.keys(errors).map((key) => ({ message: errors[key] }));
  }, [errors]);
  return (
    <Box>
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Text>{status}</Text>
        {errorMessages.map((error, i) => {
          return <Text key={i}>{error.message}</Text>;
        })}
      </Flex>
    </Box>
  );
};

export default ErrorSummary;
