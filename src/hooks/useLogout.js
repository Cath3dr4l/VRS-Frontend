import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("customer");

    // update the auth context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
