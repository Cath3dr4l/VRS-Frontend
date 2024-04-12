import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStaffContext } from "../hooks/useStaffContext";
import { useManagerContext } from "../hooks/useManagerContext";
import { useCartContext } from "../hooks/useCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FaAngleDown } from "react-icons/fa";
import NavLogo from "./NavLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { customer } = useAuthContext();
  const { cartItems } = useCartContext();
  const { staff } = useStaffContext();
  const { manager } = useManagerContext();
  const location = useLocation();
  const genreList = [
    "action",
    "comedy",
    "drama",
    "sci-fi",
    "horror",
    "thriller",
    "romance",
    "animation",
    "fantasy",
    "mystery",
    "crime",
    "adventure",
  ];

  // Log Out
  const { logout } = useLogout();

  if (location.pathname.startsWith("/management")) {
    return (
      <div className="bg-background/80 w-screen items-center justify-between flow-root p-4">
        <Link to="/management">
          <NavLogo />
        </Link>
        {(staff || manager) && (
          <button
            className="bg-primary cursor-pointer float-right rounded px-6 py-2 mr-2 text-white"
            onClick={() => {
              if (staff) logout("staff");
              if (manager) logout("manager");
            }}
          >
            Log Out
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-background/80 w-screen items-center justify-between flow-root p-4">
      <Link to="/">
        <NavLogo />
      </Link>
      <div className="group inline-block relative ml-10 m-1">
        <button
          className="font-lg text-xl font-semibold text-white cursor-pointer flex items-center"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          Categories{" "}
          <FaAngleDown className="-translate-y-2 ml-1 transition-all duration-200 group-hover:translate-y-1 opacity-0 group-hover:opacity-100" />
        </button>
        <div
          className={`absolute mt-1 z-10 w-64 transition-transform ease-out duration-500 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <ul className="bg-gray-800 text-white p-2 rounded-lg shadow mt-1 grid grid-cols-2 gap-2">
            {genreList.map((genre) => {
              return (
                <li key={genre} className="hover:bg-gray-700">
                  <Link
                    to={`/category/${genre}`}
                    className="block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {customer ? (
        <div className="float-right mx-2 text-lg">
          <Link to="/cart">
            <button className="relative cursor-pointer pr-4 text-white">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </Link>
          <Link to="/profile">
            <button className="cursor-pointer pr-4 text-white">Profile</button>
          </Link>
          <button
            className="bg-primary cursor-pointer rounded px-6 py-2 text-white"
            onClick={() => {
              logout("customer");
            }}
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
