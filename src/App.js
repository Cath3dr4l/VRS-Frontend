import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import HomePage from "./components/homePage";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import Management from "./pages/Management";
import Staff from "./pages/Staff";
import Manager from "./pages/Manager";

const App = () => {
  const { customer } = useAuthContext();
  return (
    <Router>
      <div className="z-[100] fixed">
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!customer ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!customer ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/movie/:id" element={<Movie />} />
          <Route
            element={
              <PrivateRoutes userType="customer" redirectPath="/login" />
            }
          >
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/cart" exact element={<Cart />} />
          </Route>
          <Route path="/management" element={<Management/>}/>
          <Route path="/management/staff" element={<Staff/>}/>
          <Route path="/management/manager" element={<Manager/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
