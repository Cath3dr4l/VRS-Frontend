import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStaffContext } from "../hooks/useStaffContext";
import { useManagerContext } from "../hooks/useManagerContext";

const PrivateRoutes = (props) => {
  const { userType, redirectPath } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { dispatch: dispatchCustomer } = useAuthContext();
  const { dispatch: dispatchStaff } = useStaffContext();
  const { dispatch: dispatchManager } = useManagerContext();

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem(userType));
      if (!user) {
        return setIsAuthenticated(false);
      }
      const response = await fetch(`/api/${userType}s/auth`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        switch (userType) {
          case "customer":
            dispatchCustomer({ type: "LOGOUT" });
            break;
          case "staff":
            dispatchStaff({ type: "LOGOUT" });
            break;
          case "manager":
            dispatchManager({ type: "LOGOUT" });
            break;
        }
        return setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoutes;
