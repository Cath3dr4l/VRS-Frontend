import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useManagerContext } from "../hooks/useManagerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Recruit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { manager } = useManagerContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/managers/createstaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${manager.token}`,
      },
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        phone,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
      navigate("/management/manager");
    }
  };

  return (
    <div className="fixed w-full px-4 py-24 z-[50]">
      <div className="max-w-[450px] h-[600px] mx-auto bg-black/25 text-white rounded-md">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">
              Recruit Staff
            </h1>
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={username}
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <br />
            <div className="relative">
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
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={phone}
                required
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
            <br />
            <button
              className="bg-primary w-full py-3 my-3 font-semibold"
              id="sub_btn"
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recruit;
