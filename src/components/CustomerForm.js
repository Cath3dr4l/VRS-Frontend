import { useState } from "react";
import { useCustomersContext } from "../hooks/useCustomersContext";

const CustomerForm = () => {
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

    const response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
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
    <form className="customer-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone:</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label>Address:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CustomerForm;
