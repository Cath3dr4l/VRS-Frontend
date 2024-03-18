import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  return customer ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
