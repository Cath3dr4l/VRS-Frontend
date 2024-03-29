import { Link } from "react-router-dom";
import StaffSearchList from "../components/staffSearchList";
import { FaAngleDown } from "react-icons/fa";

const Staff = () => {
  return (
    <div>
      <div className="z-[100] fixed ml-[200px] m-5 flex gap-4">
        <Link to="/management/allorders">
          <button className="font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
            All Orders
            <FaAngleDown className="ml-1" />
          </button>
        </Link>
      </div>
      <div className="py-20">
        {/* <h1 className="text-white font-bold text-xl mx-4 p-2">All movies</h1> */}
        <StaffSearchList videosPath="../api/videos" />
      </div>
    </div>
  );
};

export default Staff;
