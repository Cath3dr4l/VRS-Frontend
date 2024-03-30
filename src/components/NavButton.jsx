import { Link } from "react-router-dom";

const NavButton = ({ label, path }) => {
  return (
    <Link to={path}>
      <button className="group relative overflow-hidden font-lg text-xl font-semibold text-white cursor-pointer flex items-center">
        {label}
        <span className="absolute h-0.5 bg-white bottom-0 left-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out"></span>
      </button>
    </Link>
  );
};

export default NavButton;
