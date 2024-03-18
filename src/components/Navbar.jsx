import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { customer } = useAuthContext();
  // Log Out
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <div className="flex  items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
      <h1 className="text-3xl font-bold font-poppins cursor-pointer text-white">
        VIDEODOG
      </h1>
      </Link>
    {customer? (
      <div>
      <Link to="/profile">
      <button className="text-white pr-4 cursor-pointer">Profile</button>
      </Link>
      <button className="bg-primary px-6 py-2 rounded cursor-pointer text-white"  onClick={handleClick} >Log Out</button>
    </div>)
      :
      (<div>
        <Link to="/signup">
        <button className="text-white pr-4 cursor-pointer">Sign Up</button>
        </Link>
        <Link to="/login">
        <button className="bg-primary px-6 py-2 rounded cursor-pointer text-white">Log In</button>
        </Link>
      </div>)
    }
    </div>
  )
}

export default Navbar
