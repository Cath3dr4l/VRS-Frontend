import React from "react";

import "../App.css";

const SignUpPage = () => {
  return (
    <div className="m-5-auto text-center">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form action="/">
        <p>
          <label>Username</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input type="email" name="email" required />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type="password" name="password" requiredc />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            I agree all statements in{" "}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms of service
            </a>
          </span>
          .
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
