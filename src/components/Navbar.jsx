import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { customer } = useAuthContext();
  // Log Out
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <div className="absolute  z-[100] flex w-full items-center justify-between p-4">
      <Link to="/">
        <h1 className="font-poppins cursor-pointer text-3xl font-bold text-white">
          VIDEODOG
        </h1>
      </Link>
      {customer ? (
        <div>
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
        <div>
          <Link to="/signup">
            <button className="cursor-pointer pr-4 text-white">Sign Up</button>
          </Link>
          <Link to="/login">
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
