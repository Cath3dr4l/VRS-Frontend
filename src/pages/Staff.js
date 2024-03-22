import { Link } from "react-router-dom";

const Staff = () => {
  return (
    <>
      <div>Staff</div>
      <Link to="/management/allorders">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          All Orders
        </button>
      </Link>
    </>
  );
};

export default Staff;
