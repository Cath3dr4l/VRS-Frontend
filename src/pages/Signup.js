import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";
// import "../App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(
      username,
      password,
      name,
      email,
      phone,
      address
    );
    if (success) {
      navigate("/");
    }
  }
  return (
    <div className="fixed w-full px-4 py-24 z-[50]">
      <div className="max-w-[450px] h-[600px] mx-auto bg-black/25 text-white">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">Sign Up</h1>
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
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={name}
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input className="p-2 rounded w-full bg-gray-700"
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={phone}
                required
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </p>
            <br />
            <button className="bg-primary w-full py-3 my-3 font-semibold" id="sub_btn" type="submit" disabled={isLoading}>
              Register
            </button>
            {error && <div className="error">{error}</div>}
            <p className="py-3">
              <span  className=" text-gray-600" > Already have an account? </span> <Link to="/login">Log in</Link>.
            </p>
          </form>
          </div>
      </div>
    </div>
  );
};

export default Signup;
