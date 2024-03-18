import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import HomePage from "./components/homePage";
import Navbar from "./components/Navbar";
const App = () => {
  const { customer } = useAuthContext();
  return (
    <Router>
      <div>
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
            path="/cart"
            element={customer ? <Cart /> : <Navigate to="/"></Navigate>}
          />
          <Route
            path="/profile"
            element={customer ? <Profile /> : <Navigate to="/"></Navigate>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
