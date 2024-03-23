import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useStaffContext } from "./useStaffContext";
import { useManagerContext } from "./useManagerContext";

export const useLogout = () => {
  const { dispatch: dispatchCustomer } = useAuthContext();
  const { dispatch: dispatchStaff } = useStaffContext();
  const { dispatch: dispatchManager } = useManagerContext();

  const navigate = useNavigate();
  const logout = (userType) => {
    switch (userType) {
      case "customer":
        localStorage.removeItem("customer");
        localStorage.removeItem("videodog-cart");
        dispatchCustomer({ type: "LOGOUT" });
        navigate("/");
        break;
      case "staff":
        localStorage.removeItem("staff");
        dispatchStaff({ type: "LOGOUT" });
        navigate("/management");
        break;
      case "manager":
        localStorage.removeItem("manager");
        dispatchManager({ type: "LOGOUT" });
        navigate("/management");
        break;
    }
  };

  return { logout };
};
