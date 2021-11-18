import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Input,
  Select,
  Button,
  Label,
} from "@theme-ui/components";
import { useReturn } from "../../hooks/useReturn";
import { formatMoneyAmount } from "../../utils/format-price";
import CartItem from "../cart-summary/cart-item";

const CreateReturn = () => {
  const { order } = useReturn();
  console.log(order);
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <Text variant="accountDomain">Items to return</Text>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Item</Text>
        <Flex
          sx={{
            alignItems: "center",
          }}
        >
          <Text
            sx={{
              mr: 3,
              width: "100px",
            }}
          >
            Quantity
          </Text>
          <Text
            sx={{
              textAlign: "right",
              width: "100px",
            }}
          >
            Refundable
          </Text>
        </Flex>
      </Flex>
      {order.items.map((item) => {
        return (
          <Box key={item.id}>
            <Flex
              sx={{
                alignItems: "center",
              }}
            >
              <Label
                sx={{
                  alignItems: "center",
                }}
              >
                <Checkbox defaultChecked={false} />
                {item.title} – {item.variant.title}
              </Label>
              <Input
                variant="underlined"
                sx={{
                  width: "100px",
                  mr: 3,
                }}
                type="number"
                defaultValue={item.quantity}
              />
              <Text
                sx={{
                  width: "100px",
                  textAlign: "right",
                }}
              >
                {formatMoneyAmount(
                  {
                    amount: item.refundable,
                    currencyCode: order.currency_code,
                  },
                  2,
                  0
                )}
              </Text>
            </Flex>
          </Box>
        );
      })}
      <Text variant="accountDomain">Return shipping method</Text>
      <Select>
        <option>Free Shipping – €0</option>
      </Select>
      <Text variant="accountDomain">Items to send</Text>
      <Button>Complete</Button>
    </Flex>
  );
};

export default CreateReturn;
