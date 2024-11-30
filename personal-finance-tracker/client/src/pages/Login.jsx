// src/pages/Login.js
import React from "react";
import LeftRightPanel from "../component/LeftRightPanel";
import LoginForm from "../component/LoginForm";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
  };

  return (
    <LeftRightPanel>
      {{
        leftPanel: (
          <>
            <h1 className="logo">MoneyUP</h1>
            <h2 className="welcomeText">Welcome Back!</h2>
            <LoginForm onSubmit={handleLogin} />
            <p className="signUpText">
              Don’t have an account?{" "}
              <a href="/signup" className="signUpLink">
                Sign up
              </a>
            </p>
          </>
        ),
        rightPanel: <div className="rightPanelContent"></div>, // You can add anything to the right panel here
      }}
    </LeftRightPanel>
  );
};

export default Login;
