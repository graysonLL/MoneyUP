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
        logo: <h1 className="logo">Money<span>UP</span></h1>,
        leftPanel: (
          <>
            <h2 className="welcomeText">Sign in to your account</h2>
            <LoginForm onSubmit={handleLogin} />
            <p className="signUpText">
              Don't have an account?{" "}
              <a href="/signup" className="signUpLink">
                Sign up
              </a>
            </p>
          </>
        ),
        rightPanel: null
      }}
    </LeftRightPanel>
  );
};

export default Login;
