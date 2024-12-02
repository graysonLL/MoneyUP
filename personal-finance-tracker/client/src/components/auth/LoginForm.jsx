// src/components/LoginForm.js
import React, { useState } from "react";
import "../../styles/loginform.css";
import { authService } from "../../services/authService";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await authService.login(formData);
      console.log("Login successful:", response);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
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
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input"
        value={formData.password}
        onChange={handleChange}
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
