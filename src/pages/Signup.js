import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../App.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, password, name, email, phone, address);
  };

  return (
    <div className="m-5-auto text-center">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form className="customer-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
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
        <p>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <br />
        <p>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <br />
        <p>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
        <br />
        <p>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </p>
        <br />
        <button id="sub_btn" type="submit" disabled={isLoading}>
          Register
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
