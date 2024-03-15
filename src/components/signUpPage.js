import React from "react";
import { useState } from "react";
import { useCustomersContext } from "../hooks/useCustomersContext";

import "../App.css";

const SignUpPage = () => {
  const { dispatch } = useCustomersContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = {
      username,
      password,
      name,
      email,
      phone,
      address,
    };

    const response = await fetch("http://localhost:9000/api/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      let error = "";
      if (response.status === 400) {
        error = Object.values(data).join(" ");
      } else {
        error = data.error;
      }
      setError(error);
    }
    if (response.ok) {
      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setError(null);
      console.log("Sign up successful!");
      dispatch({ type: "CREATE_CUSTOMERS", payload: data });
    }
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
            type="text"
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
        <button id="sub_btn" type="submit">
          Register
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignUpPage;
