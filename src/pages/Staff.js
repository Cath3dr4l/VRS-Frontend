import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";

const Staff = () => {
  return (
    <div>
      <div className="fixed z-[100] m-5 ml-[200px] flex gap-4">
        <NavButton label="All Orders" path="/management/allorders" />
      </div>
      <div className="pt-20">
        <StaffSearchList videosPath="/api/movies" />
      </div>
    </div>
  );
};

export default Staff;
