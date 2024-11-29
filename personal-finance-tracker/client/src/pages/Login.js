import React from "react";
import "../styles/login.css"; // Import the CSS file

const Login = () => {
  return (
    <div className="container">
      {/* Left Section */}
      <div className="leftPanel">
        <h1 className="logo">MoneyUP</h1>
        <h2 className="welcomeText">Welcome Back!</h2>
        <form className="form">
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <a href="#" className="forgotPassword">
            Forgot password?
          </a>
          <button className="loginButton">Log In</button>
        </form>
        <p className="signUpText">
          Don’t have an account?{" "}
          <a href="#" className="signUpLink">
            Sign up
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="rightPanel"></div>
    </div>
  );
};

export default Login;
