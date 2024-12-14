import React from "react";
import LeftRightPanel from "../components/auth/LeftRightPanel";
import RegisterForm from "../components/auth/RegisterForm";

const Signup = () => {
  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <LeftRightPanel>
      {{
        logo: <h1 className="logo">Money<span>UP</span></h1>,
        leftPanel: (
          <>
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
        rightPanel: null
      }}
    </LeftRightPanel>
  );
};

export default Signup;
