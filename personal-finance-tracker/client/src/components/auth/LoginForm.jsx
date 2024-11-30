// src/components/LoginForm.js
import React from "react";
import "../../styles/loginform.css";
const LoginForm = ({ onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="email" placeholder="Email" className="input" required />
      <input
        type="password"
        placeholder="Password"
        className="input"
        required
      />
      <a href="#" className="forgotPassword">
        Forgot password?
      </a>
      <button type="submit" className="loginButton">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
