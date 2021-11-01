import { Box, Button, Flex, Spinner, Text } from "@theme-ui/components";
import { navigate } from "gatsby-link";
import React, { useEffect, useState } from "react";
import { useCustomer } from "../hooks/useCustomer";
import Contact from "../components/account/domains/contact";
import Orders from "../components/account/domains/orders";

const Customer = () => {
  const [view, setView] = useState(0);
  const { customer, loading } = useCustomer();

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
          flex: "1 0 auto",
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
          <Button variant="customerMenu" onClick={() => setView(0)}>
            Orders
          </Button>
          <Button
            variant="customerMenu"
            onClick={() => setView(1)}
            sx={{
              mt: 2,
            }}
          >
            Information
          </Button>
        </Flex>
      </Box>
      <Box
        sx={{
          width: "80%",
          pl: 5,
        }}
      >
        {view === 0 ? <Orders /> : <Contact />}
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
