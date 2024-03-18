import React from 'react'
import { Link } from 'react-router-dom'
import {customer} from '../pages/Profile'

const Navbar = () => {
  return (
    <div className="flex  items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
      <h1 className="text-3xl font-bold font-poppins cursor-pointer text-white">
        VIDEODOG
      </h1>
      </Link>
      {console.log(customer)}
      <div>
        <Link to="/signup">
        <button className="text-white pr-4 cursor-pointer">Sign Up</button>
        </Link>
        <Link to="/login">
        <button className="bg-primary px-6 py-2 rounded cursor-pointer text-white">Log In</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
