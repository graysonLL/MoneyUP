// src/components/RegisterForm.js
import React from "react";
import "../styles/registerform.css";
const RegisterForm = ({ onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
        <input type="number" placeholder="Number" className="input" required />
      <input type="email" placeholder="Email" className="input" required />
      <input type="password" placeholder="Password" className="input" required />
      <input type="password" placeholder="Confirm Password" className="input" required />
      <button type="submit" className="registerButton">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
