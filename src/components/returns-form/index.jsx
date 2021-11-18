import { Box } from "@theme-ui/components";
import React from "react";
import { useReturn } from "../../hooks/useReturn";
import CreateReturn from "./create-return";
import OrderRetrieval from "./order-retrieval";

const ReturnsForm = () => {
  const { order } = useReturn();
  return <Box>{!order ? <OrderRetrieval /> : <CreateReturn />}</Box>;
};

export default ReturnsForm;
