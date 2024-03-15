import { CustomersContext } from "../context/CustomerContext";
import { useContext } from "react";

export const useCustomersContext = () => {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error(
      "useCustomersContext must be used within a CustomersContextProvider"
    );
  }
  return context;
};
