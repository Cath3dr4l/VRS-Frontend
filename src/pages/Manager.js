import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StaffSearchList from "../components/staffSearchList";

const Manager = () => {

  return (
    <div className="py-10">
      <Link to="/management/recruit">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Recruit Staff
        </button>
      </Link>
      <Link to="/management/addmovie">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Movie
        </button>
      </Link>
      <div>
        <h1 className="text-white font-semibold">All movies</h1>
        <StaffSearchList videosPath="../api/videos" />
      </div>
    </div>
  );
};

export default Manager;
