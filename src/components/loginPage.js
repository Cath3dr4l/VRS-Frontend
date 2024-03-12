import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

const LoginPage = () => {
  return (
    <div className="m-5-auto text-center">
      <h2>Sign in to us</h2>
      <form action="/">
        <p>
          <label>Username or email address</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <input type="password" name="password" required />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
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
