import React from "react";
import { Grid, Text } from "@theme-ui/components";
import StatusLabel from "../../badges/status-badge";
import { formatMoneyAmount } from "../../../../utils/format-price";

const Order = ({ order }) => {
  return (
    <Grid variant="layouts.orderGrid">
      <Text
        sx={{
          gridArea: "id",
          width: "100%",
        }}
      >
        {order.display_id}
      </Text>
      <Text
        sx={{
          gridArea: "date",
        }}
      >{`${new Date(order.created_at).toLocaleDateString("en-US")}`}</Text>
      <Text
        sx={{
          gridArea: "payment",
        }}
      >
        <StatusLabel type="payment" status={order.payment_status} />
      </Text>
      <Text
        sx={{
          gridArea: "shipping",
        }}
      >
        <StatusLabel type="fulfillment" status={order.fulfillment_status} />
      </Text>
      <Text
        sx={{
          gridArea: "total",
          textAlign: "right",
        }}
      >
        {formatMoneyAmount(
          { amount: order.total, currencyCode: order.currency_code },
          2,
          0
        )}
      </Text>
    </Grid>
  );
};

export default Order;
