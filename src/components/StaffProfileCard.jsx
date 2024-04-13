import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const StaffProfileCard = ({ user }) => {
  return (
    <div className="p-6 w-80 mx-auto bg-gray-800 text-white rounded-xl shadow-md flex items-center space-x-4">
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
      </div>
    </div>
  );
};

export default StaffProfileCard;
