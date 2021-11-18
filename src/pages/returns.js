import { Box } from "@theme-ui/components";
import React from "react";
import ReturnsForm from "../components/returns-form";

const Returns = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <ReturnsForm />
    </Box>
  );
};

export default Returns;
