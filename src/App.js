import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useStaffContext } from "./hooks/useStaffContext";
import { useManagerContext } from "./hooks/useManagerContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import Management from "./pages/Management";
import Staff from "./pages/Staff";
import Manager from "./pages/Manager";
import Recruit from "./pages/Recruit";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieManage from "./pages/MovieManage";
import MovieStaff from "./pages/MovieStaff";
import AllOrders from "./pages/AllOrders";
import OrdersManage from "./pages/OrdersManage";
import Invoice from "./pages/Invoice";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";

const App = () => {
  const { customer } = useAuthContext();
  const { staff } = useStaffContext();
  const { manager } = useManagerContext();

  return (
    <Router>
      <div className="z-[100] fixed">
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={!customer ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!customer ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot"
            element={!customer ? <ForgotPass /> : <Navigate to="/" />}
          />
          <Route
            path="/resetpass/:token"
            element={!customer ? <ResetPass /> : <Navigate to="/" />}
          />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/category/:genre" element={<Category />} />
          <Route
            element={
              <PrivateRoutes userType="customer" redirectPath="/login" />
            }
          >
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/invoice" exact element={<Invoice />} />
          </Route>
          <Route
            path="/management"
            element={
              !staff && !manager ? (
                <Management />
              ) : (
                <Navigate
                  to={manager ? "/management/manager" : "/management/staff"}
                />
              )
            }
          />
          <Route
            element={
              <PrivateRoutes userType="staff" redirectPath="/management" />
            }
          >
            <Route path="/management/staff" element={<Staff />} />
            <Route path="/management/allorders" element={<AllOrders />} />
            <Route path="/management/moviestaff/:id" element={<MovieStaff />} />
          </Route>
          <Route
            element={
              <PrivateRoutes userType="manager" redirectPath="/management" />
            }
          >
            <Route path="/management/manager" element={<Manager />} />
            <Route path="/management/recruit" element={<Recruit />} />
            <Route path="/management/addmovie" element={<AddMovie />} />
            <Route
              path="/management/moviemanage/:id"
              element={<MovieManage />}
            />
            <Route path="/management/editmovie/:id" element={<EditMovie />} />
            <Route path="/management/manageorders" element={<OrdersManage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
