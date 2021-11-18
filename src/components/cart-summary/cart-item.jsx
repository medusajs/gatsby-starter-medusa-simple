import React from "react";
import { Flex, Box, Text, Image } from "@theme-ui/components";
import { formatMoneyAmount } from "../../utils/format-price";
import ItemQuantity from "../buttons/item-quantity";
import RemoveItem from "../buttons/remove-item";

const CartItem = ({ editable, item, cart }) => {
  const thumbnail = item.thumbnail || item.images[0].src;

  return (
    <Box
      sx={{
        fontWeight: 300,
        fontSize: [2],
        mb: 3,
        minWidth: 300,
        flex: "1 0 auto",
      }}
    >
      <Flex>
        <Box
          sx={{
            width: 120,
            mr: 3,
          }}
        >
          <Image
            sx={{
              width: "100%",
            }}
            src={thumbnail}
            alt={item.title}
          />
        </Box>
        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            py: 1,
            flex: "1 0 auto",
          }}
        >
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>{item.title}</Text>
            <Flex
              sx={{
                alignItems: "center",
              }}
            >
              <Text>
                {formatMoneyAmount(
                  {
                    amount: item.unit_price * item.quantity,
                    currencyCode: cart.region.currency_code,
                  },
                  2,
                  cart.region.tax_rate
                )}
              </Text>
              {editable ? <RemoveItem item={item} /> : null}
            </Flex>
          </Flex>
          <Text
            sx={{
              color: "faded",
            }}
          >
            Variant:{" "}
            <Text
              sx={{
                color: "black",
              }}
            >
              {item.variant.title}
            </Text>
          </Text>
          {editable ? (
            <ItemQuantity item={item} />
          ) : (
            <Text
              sx={{
                color: "faded",
              }}
            >
              Quantity:{" "}
              <Text
                sx={{
                  color: "black",
                }}
              >
                {item.quantity}
              </Text>
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartItem;
