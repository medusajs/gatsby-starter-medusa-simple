import { Box, Label, Text } from "@theme-ui/components";
import React from "react";
import Field from "./field";

const FieldWrapper = ({ label, ...rest }) => {
  return (
    <Box className="wrapper">
      <Label
        sx={{
          mb: 2,
        }}
      >
        {label}
      </Label>
      <Field {...rest} />
    </Box>
  );
};

export default FieldWrapper;
