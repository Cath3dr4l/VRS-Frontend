import React from "react";
import { Link } from "react-router-dom";
import StaffSearchList from "../components/staffSearchList";
import { FaAngleDown } from "react-icons/fa";

const Manager = () => {
  return (
    <div>
      <div className="z-[100] fixed ml-[200px] m-5 flex gap-4">
        <Link to="/management/manageorders">
          <button className="group relative overflow-hidden font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            All Orders
            <span className="absolute h-0.5 bg-white bottom-0 left-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out"></span>
          </button>
        </Link>
        <Link to="/management/recruit">
          <button className="group relative overflow-hidden font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            Recruit Staff
            <span className="absolute h-0.5 bg-white bottom-0 left-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out"></span>
          </button>
        </Link>
        <Link to="/management/addmovie">
          <button className="group relative overflow-hidden font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            Add Movie
            <span className="absolute h-0.5 bg-white bottom-0 left-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out"></span>
          </button>
        </Link>
      </div>
      <div className="py-20">
        <StaffSearchList videosPath="/api/movies" />
      </div>
    </div>
  );
};

export default Manager;
