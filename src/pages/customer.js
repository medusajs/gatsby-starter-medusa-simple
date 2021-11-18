import { Box, Button, Flex, Spinner, Text } from "@theme-ui/components";
import { navigate } from "gatsby-link";
import React, { useEffect, useState } from "react";
import { useCustomer } from "../hooks/useCustomer";
import Contact from "../components/account/domains/contact";
import Orders from "../components/account/domains/orders";

const Customer = () => {
  const [view, setView] = useState(0);
  const {
    customer,
    loading,
    actions: { logoutCustomer },
  } = useCustomer();

  useEffect(() => {
    if (!customer && !loading) {
      navigate("/login");
    }
  }, [customer, loading]);

  return !loading ? (
    <Flex
      sx={{
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Box
        as="nav"
        sx={{
          width: "20%",
          pt: 5,
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            fontSize: [1],
          }}
        >
          <Text
            sx={{
              mb: 3,
            }}
          >
            MY ACCOUNT
          </Text>
          <Button
            className={view === 0 ? "active" : null}
            variant="customerMenu"
            onClick={() => setView(0)}
          >
            Account information
          </Button>
          <Button
            className={view === 1 ? "active" : null}
            variant="customerMenu"
            onClick={() => setView(1)}
            sx={{
              mt: 2,
            }}
          >
            My orders
          </Button>
          <Button
            variant="customerMenu"
            onClick={() => logoutCustomer()}
            sx={{
              mt: 2,
            }}
          >
            Log out
          </Button>
        </Flex>
      </Box>
      <Box
        sx={{
          px: 6,
          pt: 5,
          flex: "1 0 auto",
        }}
      >
        {view === 0 ? <Contact /> : <Orders />}
      </Box>
    </Flex>
  ) : (
    <Flex
      sx={{
        height: "calc(100vh - 100px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </Flex>
  );
};

export default Customer;
