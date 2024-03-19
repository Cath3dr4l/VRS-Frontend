import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  const user = JSON.parse(localStorage.getItem(props.userType));
  return user ? <Outlet /> : <Navigate to={props.redirectPath} />;
};

export default PrivateRoutes;
