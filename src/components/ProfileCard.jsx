import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ user, role }) => {
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
        {role === "customer" && (
          <p className="text-gray-300 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {user.address ? user.address : "No address provided"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
