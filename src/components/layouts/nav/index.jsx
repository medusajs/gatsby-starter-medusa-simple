import { Box, Flex, Image, Text } from "@theme-ui/components";
import Logo from "../../../images/logo-icon.svg";
import React from "react";
import RegionSelector from "./region-selector";
import NavLink from "../../link/nav-link";
import styled from "@emotion/styled";
import CartSelector from "./cart-selector";
import { useCustomer } from "../../../hooks/useCustomer";
import { useCheckout } from "../../../hooks/useCheckout";
import BreadCrumbs from "../../checkout2/checkout-steps/bread-crumbs";
import Link from "../../link/link";

const CollectionLinks = styled(Flex)`
  a {
    margin-right: 1rem;
  }

  a:last-of-type {
    margin: 0;
  }
`;

const Nav = () => {
  const { customer } = useCustomer();
  const { isCheckout } = useCheckout();
  return (
    <Box
      as="nav"
      sx={{
        position: "sticky",
        height: "80px",
        width: "100%",
        bg: "white",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        px: 4,
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <NavLink to={"/"}>
          <Image
            sx={{
              width: "32px",
              mr: 4,
            }}
            src={Logo}
            alt=""
          />
        </NavLink>
        {!isCheckout ? (
          <Flex
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CollectionLinks>
              <NavLink to={"/products"}>Products</NavLink>
            </CollectionLinks>
            <Flex
              sx={{
                alignItems: "center",
              }}
            >
              <RegionSelector
                sx={{
                  mr: 3,
                }}
              />
              {customer ? (
                <NavLink
                  to={"/customer"}
                >{`${customer.first_name} ${customer.last_name}`}</NavLink>
              ) : (
                <NavLink to={"/login"}>Sign in</NavLink>
              )}
              <CartSelector />
            </Flex>
          </Flex>
        ) : (
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <BreadCrumbs />
            <Link
              to={"/"}
              sx={{
                color: "faded",
                textDecoration: "none",
                fontSize: 1,
                transition: "color .2s linear",
                "&:hover": {
                  color: "text",
                },
              }}
            >
              BACK TO STORE
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Nav;
