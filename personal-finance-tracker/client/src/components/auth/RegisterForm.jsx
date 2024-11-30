// src/components/RegisterForm.js
import React, { useState } from "react";
import "../../styles/registerform.css";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="input"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit" className="registerButton">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
