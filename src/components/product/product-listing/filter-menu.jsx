import { Box, Flex } from "@theme-ui/components";
import React from "react";

// @TODO: Add filter menu to filter products in listing using graphql
const FilterMenu = () => {
  const filter = () => {};

  return (
    <Box as="form" onSubmit={filter}>
      <Flex></Flex>
    </Box>
  );
};
