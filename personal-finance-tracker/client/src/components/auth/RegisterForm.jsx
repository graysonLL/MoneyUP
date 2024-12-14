// src/components/RegisterForm.js
import React, { useState } from "react";
import "../../styles/registerform.css";
import { authService } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../../validation/validationSchemas';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach(detail => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }
    setErrors({});
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
      {errors.firstName && <div className="error">{errors.firstName}</div>}
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="input"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      {errors.lastName && <div className="error">{errors.lastName}</div>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <div className="error">{errors.email}</div>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="input"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      <button type="submit" className="registerButton">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
