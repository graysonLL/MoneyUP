// src/components/RegisterForm.js
import React, { useState } from "react";
import "../../styles/registerform.css";
import { authService } from "../../services/authService";
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await authService.register(formData);
      console.log("Registration successful:", response);
      alert("Registration successful! You may now login!");
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="input"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="input"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
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
