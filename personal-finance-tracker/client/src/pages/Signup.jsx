// src/pages/Signup.js
import React from "react";
import LeftRightPanel from "../components/auth/LeftRightPanel";
import RegisterForm from "../components/auth/RegisterForm";

const Signup = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., API call)
  };

  return (
    <LeftRightPanel>
      {{
        leftPanel: (
          <>
            <h1 className="logo">MoneyUP</h1>
            <h2 className="welcomeText">Create an account</h2>
            <p className="accountDescription">
              Easily manage your money and reach your goals with MoneyUP.
            </p>
            <RegisterForm onSubmit={handleRegister} />
            <p className="signUpText">
              Already have an account?{" "}
              <a href="/login" className="signUpLink">
                Log in
              </a>
            </p>
          </>
        ),
        rightPanel: <div className="rightPanelContent"></div>, // You can add content here for the right panel
      }}
    </LeftRightPanel>
  );
};

/* src/styles/login.css or create signup.css */

export default Signup;
