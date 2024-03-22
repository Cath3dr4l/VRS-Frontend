import { Link } from "react-router-dom";

const Manager = () => {
  return (
    <>
      <div>Manager</div>
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
    </>
  );
};

export default Manager;
