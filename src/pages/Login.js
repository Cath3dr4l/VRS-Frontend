import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="fixed w-full my-24 px-4 py-24 z-[50]">
      <div className="w-[450px] h-[360px] align-middle mx-auto my-auto bg-black/25 text-white rounded-md">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">Log In</h1>
            <p>
              <input className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={username}
                placeholder = "Username" 
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input className="p-2 rounded w-full bg-gray-700"
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="Password"
              />
            </p>
            <br />
            <button className="bg-primary w-full py-3 my-3 font-semibold" id="sub_btn" type="submit" disabled={isLoading}>
              Log In
            </button>
            {error && <div className="error">{error}</div>}
            <p className="py-3">
              <span  className=" text-gray-600" > Don't have an account? </span> <Link to="/signup">Sign up</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;