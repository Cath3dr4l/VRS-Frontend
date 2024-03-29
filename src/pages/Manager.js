import React from "react";
import { Link } from "react-router-dom";
import StaffSearchList from "../components/staffSearchList";
import { FaAngleDown } from "react-icons/fa";

const Manager = () => {
  return (
    <div>
      <div className="z-[100] fixed ml-[200px] m-5 flex gap-4">
        <Link to="/management/manageorders">
          <button className="font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            All Orders
            <FaAngleDown className="ml-1" />
          </button>
        </Link>
        <Link to="/management/recruit">
          <button className="font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            Recruit Staff
            <FaAngleDown className="ml-1" />
          </button>
        </Link>
        <Link to="/management/addmovie">
          <button className="font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            Add Movie
            <FaAngleDown className="ml-1" />
          </button>
        </Link>
      </div>
      <div className="py-20">
        {/* <h1 className="text-white font-semibold">All movies</h1> */}
        <StaffSearchList videosPath="/api/videos" />
      </div>
    </div>
  );
};

export default Manager;
