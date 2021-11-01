import { useContext } from "react";
import CustomerContext from "../context/customer-context";

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomer must be used within a child of CustomerProvider"
    );
  }

  return context;
};
