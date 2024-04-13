import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

const CustomerProfileCard = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="group p-6 w-100 h-60 [perspective:1000px]">
      <div
        className={`relative h-full w-full mx-auto text-white rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        } [backface-visibility:hidden]`}
        onClick={handleClick}
      >
        {" "}
        <div className="absolute inset-0 px-3 flex items-center space-x-4 bg-gray-800 rounded-xl">
          <div className="space-y-2">
            <div className="text-xl font-medium">{user.name}</div>
            <p className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {user.phone}
            </p>
            <p className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              {user.email}
            </p>
            <p className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              {user.address ? user.address : "No address provided"}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 px-3 flex items-center space-x-4 bg-gray-900 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] ">
          <div className="space-y-2 w-full">
            <div className="text-xl font-medium">
              Movies Ordered: {user.orders.length}
            </div>
            <div className="w-full h-[100px] overflow-y-scroll p-[5px]">
              <ol>
                {user.orders.map((order, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 w-full p-[10px] my-[5px] rounded-md"
                  >
                    <p>
                      {index + 1}. {order.movieID.name}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileCard;
