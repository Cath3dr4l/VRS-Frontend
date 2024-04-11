import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className="fixed w-screen h-screen bg-background top-0 z-[100] flex justify-center items-center text-text font-poppins">
      <div className="flex flex-col justify-center items-center">
        <div className="text-9xl flex items-center justify-center gap-10 animate-shake">
          404
          <FiAlertTriangle />
        </div>
        <div className="text-6xl mt-5">PAGE NOT FOUND</div>
        <Link to="/" className="text-2xl mt-10 hover:text-red-500">
          Homepage <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
