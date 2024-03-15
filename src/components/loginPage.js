import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`http://localhost:9000/api/customers/query?user=${username}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      if (data.password !== password) {
        setError("Password is incorrect");
        return;
      }
      setUsername("");
      setPassword("");
      console.log("Log in successful!");
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
        <button id="sub_btn" type="submit">
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

export default LoginPage;
