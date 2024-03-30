import React from "react";
import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";

const Manager = () => {
  return (
    <div>
      <div className="z-[100] fixed ml-[200px] m-5 flex gap-4">
        <NavButton label="All Orders" path="/management/manageorders" />
        <NavButton label="Recruit Staff" path="/management/recruit" />
        <NavButton label="Add Movie" path="/management/addmovie" />
      </div>
      <div className="py-20">
        <StaffSearchList videosPath="/api/movies" />
      </div>
    </div>
  );
};

export default Manager;
