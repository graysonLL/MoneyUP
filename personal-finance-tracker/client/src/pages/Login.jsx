// src/pages/Login.js
import React from "react";
import LeftRightPanel from "../components/auth/LeftRightPanel";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
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
        rightPanel: <div className="rightPanelContent"></div>,
      }}
    </LeftRightPanel>
  );
};

export default Login;
