import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoutes = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem(props.userType));
      if (!user) {
        return setIsAuthenticated(false);
      }
      const response = await fetch(`/api/${props.userType}s/auth`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        localStorage.removeItem(props.userType);
        dispatch({ type: "LOGOUT" });
        return setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to={props.redirectPath} />;
};

export default PrivateRoutes;
