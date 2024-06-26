import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Management = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password, "staff");
    if (success) {
      navigate("/management/staff");
    }
  };

  const handleManagerSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password, "manager");
    if (success) {
      navigate("/management/manager");
    }
  };

  return (
    <div className="fixed w-full my-24 px-4 py-24 z-[50]">
      <div className="w-[450px] align-middle mx-auto my-auto bg-black/25 text-white rounded-md py-5">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col">
            <h1 className="text-2xl font-semibold text-center my-4">Log In</h1>
            <p className="mb-4">
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={username}
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <div className="relative mb-4">
              <input
                className="p-2 rounded w-full bg-gray-700"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="Password"
              />
              <FontAwesomeIcon
                className="absolute top-3 right-3 text-lg cursor-pointer"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="flow-root">
              <button
                className="bg-primary float-right w-[48%] py-3 my-2 font-semibold "
                id="sub_btn"
                type="submit"
                disabled={isLoading}
                onClick={handleStaffSubmit}
              >
                Staff
              </button>
              <button
                className="bg-primary float-left w-[48%] py-3 my-2 font-semibold "
                id="sub_btn"
                type="submit"
                disabled={isLoading}
                onClick={handleManagerSubmit}
              >
                Manager
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Management;
