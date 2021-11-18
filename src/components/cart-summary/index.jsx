import React, { useMemo } from "react";
import { Box, Divider, Flex, Spinner } from "@theme-ui/components";
import { useCart } from "../../hooks/useCart";
import CartItem from "./cart-item";
import GiftCard from "./gift-card";
import DiscountCode from "./discount-code";
import CartTotals from "./cart-totals";

const CartSummary = ({ editable = false }) => {
  const { cart } = useCart();

  const items = cart.items.sort((a, b) => {
    const createdAtA = new Date(a.created_at),
      createdAtB = new Date(b.created_at);

    if (createdAtA < createdAtB) return -1;
    if (createdAtA > createdAtB) return 1;
    return 0;
  });

  return cart.items.length > 0 ? (
    <Flex
      sx={{
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
          pr: 3,
        }}
      >
        {items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <CartItem item={item} cart={cart} editable={editable} />
            </React.Fragment>
          );
        })}
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            my: 2,
          }}
        >
          <GiftCard />
        </Box>
        <DiscountCode />
        <CartTotals />
      </Flex>
    </Flex>
  ) : (
    <Flex
      sx={{
        flex: "1 0 auto",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner />
    </Flex>
  );
};

export default CartSummary;
