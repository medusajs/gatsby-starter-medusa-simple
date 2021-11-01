import { Box, Flex, Image } from "@theme-ui/components";
import Logo from "../../../images/logo-icon.svg";
import React from "react";
import RegionSelector from "./region-selector";
import NavLink from "../../link/nav-link";
import styled from "@emotion/styled";
import CartSelector from "./cart-selector";
import { useCustomer } from "../../../hooks/useCustomer";

const CollectionLinks = styled(Flex)`
  a {
    margin-right: 1rem;
  }

  a:last-child {
    margin: 0;
  }
`;

const Nav = () => {
  const { customer } = useCustomer();
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
        <Flex
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CollectionLinks>
            <NavLink to={"/products"}>All</NavLink>
            <NavLink to={"/collections/apparel"}>Apparel</NavLink>
            <NavLink to={"/collections/merch"}>Merch</NavLink>
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
              <NavLink to={"/customer"}>My page</NavLink>
            ) : (
              <NavLink to={"/login"}>Sign in</NavLink>
            )}
            <CartSelector />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
