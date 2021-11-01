import React from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import { Flex, Text } from "@theme-ui/components";

const Orders = () => {
  const { customer } = useCustomer();
  return (
    <Flex>
      <Text>Orders</Text>
    </Flex>
  );
};

export default Orders;
