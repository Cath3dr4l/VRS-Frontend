import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";

const Staff = () => {
  return (
    <div>
      <div className="z-[100] fixed ml-[200px] m-5 flex gap-4">
        <NavButton label="All Orders" path="/management/allorders" />
      </div>
      <div className="py-20">
        <StaffSearchList videosPath="/api/movies" />
      </div>
    </div>
  );
};

export default Staff;
