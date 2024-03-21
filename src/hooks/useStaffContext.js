import { StaffContext } from "../context/StaffContext";
import { useContext } from "react";

export const useStaffContext = () => {
  const context = useContext(StaffContext);

  if (!context) {
    throw new Error("useStaffContext must be used within a StaffContextProvider");
  }
  return context;
};
