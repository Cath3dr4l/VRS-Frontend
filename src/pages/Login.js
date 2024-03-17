import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../App.css";

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
    <div className="m-5-auto text-center">
      <h2>Sign in to us</h2>
      <form className="customer-form" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <p>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <br />
        <p>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <br />
        <button id="sub_btn" type="submit" disabled={isLoading}>
          Sign In
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <footer>
        <p>
          First time? <Link to="/signup">Create an account</Link>.
        </p>
      </footer>
    </div>
  );
};

export default Login;
