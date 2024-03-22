import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { customer } = useAuthContext();
  const location = useLocation();

  // Log Out
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  if (location.pathname.startsWith("/management")) {
    return (
      <div>
        <h1 className="font-poppins cursor-pointer float-left text-3xl font-bold text-white">
          VIDEODOG
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-background/80 w-screen items-center justify-between flow-root p-4">
      <Link to="/">
        <h1 className="font-poppins cursor-pointer float-left text-3xl font-bold text-white">
          VIDEODOG
        </h1>
      </Link>
      {customer ? (
        <div className="float-right mx-2">
          <Link to="/cart">
            <button className="cursor-pointer pr-4 text-white">Cart</button>
          </Link>
          <Link to="/profile">
            <button className="cursor-pointer pr-4 text-white">Profile</button>
          </Link>
          <button
            className="bg-primary cursor-pointer rounded px-6 py-2 text-white"
            onClick={handleClick}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="float-right mx-2">
          <Link to="/signup">
            <button className="cursor-pointer pr-4 text-white">Sign Up</button>
          </Link>
          <Link to="/login" state={{ prev: location.pathname }}>
            <button className="bg-primary cursor-pointer rounded px-6 py-2 text-white">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
