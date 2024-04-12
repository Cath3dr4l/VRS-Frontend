import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password, "customer");
    if (success) {
      console.log(location.state);
      navigate(location.state?.prev || "/");
    }
  };

  return (
    <div className="fixed w-full my-24 px-4 py-24 z-[50]">
      <div className="w-[450px] align-middle mx-auto my-auto bg-black/25 text-white rounded-md text-lg">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">Log In</h1>
            <p className="mb-5">
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={username}
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <div className="relative mb-5">
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
            <button
              className="bg-primary w-full py-3 my-3 font-semibold"
              id="sub_btn"
              type="submit"
              disabled={isLoading}
            >
              Log In
            </button>
            {error && <div className="error">{error}</div>}
            <p className="py-3">
              <span className=" text-gray-600"> Don't have an account? </span>{" "}
              <Link to="/signup" className="ml-2 hover:text-red-500">
                Sign up
              </Link>
            </p>
            <p>
              <Link to="/forgot" className=" text-gray-600 hover:text-red-500">
                Forgot password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
