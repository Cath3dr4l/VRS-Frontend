import { ManagerContext } from "../context/ManagerContext";
import { useContext } from "react";

export const useManagerContext = () => {
  const context = useContext(ManagerContext);

  if (!context) {
    throw new Error(
      "useManagerContext must be used within a ManagerContextProvider"
    );
  }
  return context;
};
