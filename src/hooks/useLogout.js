import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("customer");
    localStorage.removeItem("videodog-cart");
    navigate("/login");

    // update the auth context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
