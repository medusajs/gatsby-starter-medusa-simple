import React from "react";
import { useCustomer } from "../../../../hooks/useCustomer";

import { Box, Divider, Flex, Grid, Text } from "@theme-ui/components";
import Order from "./order";
import styled from "@emotion/styled";

const GridArea = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 3rem;
  grid-template-areas: "id date payment shipping total";
  width: "100%";
  align-items: center;
`;

const Orders = () => {
  const { customer, orders } = useCustomer();

  return (
    <Flex
      sx={{
        width: "95%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Grid
          variant="layouts.orderGrid"
          sx={{
            fontWeight: 500,
          }}
        >
          <Text
            sx={{
              gridArea: "id",
            }}
          >
            #
          </Text>
          <Text
            sx={{
              gridArea: "date",
            }}
          >
            Date
          </Text>
          <Text
            sx={{
              gridArea: "payment",
            }}
          >
            Payment
          </Text>
          <Text
            sx={{
              gridArea: "shipping",
            }}
          >
            Shipping
          </Text>
          <Text
            sx={{
              textAlign: "right",
              gridArea: "total",
            }}
          >
            Total
          </Text>
        </Grid>
      </Box>
      <Divider
        sx={{
          my: 3,
        }}
      />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {orders.length > 0
          ? orders.map((order, i) => {
              return <Order order={order} />;
            })
          : null}
      </Box>
    </Flex>
  );
};

export default Orders;
