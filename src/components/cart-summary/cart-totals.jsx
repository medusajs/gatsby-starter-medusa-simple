import { Box, Divider, Flex, Text } from "@theme-ui/components";
import React from "react";
import { useCart } from "../../hooks/useCart";
import { useRegion } from "../../hooks/useRegion";
import { formatMoneyAmount } from "../../utils/format-price";

const CartTotals = () => {
  const { cart } = useCart();
  const { region } = useRegion();
  return (
    <Box
      sx={{
        fontSize: [2],
        mt: 2,
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Flex variant="layouts.spaceBetween">
          <Text variant="totalDescription">Subtotal</Text>
          <Text>
            {formatMoneyAmount(
              {
                amount: cart.subtotal || 0,
                currencyCode: region.currency_code,
              },
              2,
              0
            )}
          </Text>
        </Flex>
        {Boolean(cart?.shipping_total) && (
          <Flex variant="layouts.spaceBetween">
            <Text variant="totalDescription">Shipping</Text>
            <Text>
              {formatMoneyAmount(
                {
                  amount: cart.shipping_total || 0,
                  currencyCode: region.currency_code,
                },
                2,
                0
              )}
            </Text>
          </Flex>
        )}
        <Flex variant="layouts.spaceBetween">
          <Text variant="totalDescription">Taxes</Text>
          <Text>
            {formatMoneyAmount(
              {
                amount: cart.tax_total || 0,
                currencyCode: region.currency_code,
              },
              2,
              0
            )}
          </Text>
        </Flex>
        {Boolean(cart.discount_total) || Boolean(cart.gift_card_total) ? (
          <>
            <Divider />
            {Boolean(cart.discount_total) && (
              <Flex variant="layouts.spaceBetween">
                <Text variant="totalDescription">Discounts</Text>
                <Text>
                  {"– "}
                  {formatMoneyAmount(
                    {
                      amount: cart.discount_total || 0,
                      currencyCode: region.currency_code,
                    },
                    2,
                    0
                  )}
                </Text>
              </Flex>
            )}
            {Boolean(cart.gift_card_total) && (
              <Flex variant="layouts.spaceBetween">
                <Text variant="totalDescription">Gift Cards</Text>
                <Text>
                  {"– "}
                  {formatMoneyAmount(
                    {
                      amount: cart.gift_card_total || 0,
                      currencyCode: region.currency_code,
                    },
                    2,
                    0
                  )}
                </Text>
              </Flex>
            )}
          </>
        ) : null}
        <Divider />
        <Flex variant="layouts.spaceBetween">
          <Text variant="totalDescription">Total</Text>
          <Text>
            {formatMoneyAmount(
              {
                amount: cart.total || 0,
                currencyCode: region.currency_code,
              },
              2,
              0
            )}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartTotals;
