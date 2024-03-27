import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStaffContext } from "../hooks/useStaffContext";
import { useManagerContext } from "../hooks/useManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { customer } = useAuthContext();
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
      <div className="w-screen flow-root">
        <Link to="/management">
          <h1 className="font-poppins cursor-pointer float-left text-3xl font-bold text-white">
            VIDEODOG
          </h1>
        </Link>
        {(staff || manager) && (
          <button
            className="bg-primary cursor-pointer float-right rounded px-6 py-2 m-4 text-l text-white"
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
        <h1 className="font-poppins cursor-pointer float-left text-3xl font-bold text-white">
          VIDEODOG
        </h1>
      </Link>
      <div className="group inline-block relative ml-10">
        <button
          className="font-lg text-xl font-semibold text-white cursor-pointer"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          Categories
        </button>
        <div
          className={`absolute mt-1 z-10 w-64 transition-transform ease-out duration-500 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <ul className="bg-gray-800 text-white p-2 rounded-lg shadow -mt-1 grid grid-cols-2 gap-2">
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
        <div className="float-right mx-2">
          <Link to="/cart">
            <button className="cursor-pointer pr-4 text-white">
              <FontAwesomeIcon icon={faShoppingCart} />
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
