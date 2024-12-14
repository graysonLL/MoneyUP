// src/components/LoginForm.js
import React, { useState } from "react";
import "../../styles/loginform.css";
import { authService } from "../../services/authService";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginSchema } from '../../validation/validationSchemas';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = loginSchema.validate(formData, { abortEarly: false });
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
      const response = await authService.login(formData);
      console.log("Login successful:", response);
      login(response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password.");
    }
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
      {errorMessage && <div className="error">{errorMessage}</div>}
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
