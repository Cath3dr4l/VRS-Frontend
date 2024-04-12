import { BiMoviePlay } from "react-icons/bi";

const NavLogo = () => {
  return (
    <h1 className="font-poppins cursor-pointer float-left text-3xl font-bold text-white">
      <span className="text-4xl font-raleway text-red-500">V</span>IDEO
      <span className="inline-block text-4xl font-raleway transform rotate-30 text-red-500">
        D
      </span>
      OG
      <BiMoviePlay className="inline-block text-4xl transform ml-1 align-text-top" />
    </h1>
  );
};

export default NavLogo;
