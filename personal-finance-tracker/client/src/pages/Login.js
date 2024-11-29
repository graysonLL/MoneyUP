import React from "react";

const Login = () => {
  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftPanel}>
        <h1 style={styles.logo}>MoneyUP</h1>
        <h2 style={styles.welcomeText}>Welcome Back!</h2>
        <form style={styles.form}>
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <a href="#" style={styles.forgotPassword}>
            Forgot password?
          </a>
          <button style={styles.loginButton}>Log In</button>
        </form>
        <p style={styles.signUpText}>
          Don’t have an account?{" "}
          <a href="#" style={styles.signUpLink}>
            Sign up
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div style={styles.rightPanel}></div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  leftPanel: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#000",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  welcomeText: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: "20px",
    textDecoration: "none",
    fontSize: "14px",
    color: "#007BFF",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  signUpText: {
    marginTop: "20px",
    fontSize: "14px",
  },
  signUpLink: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default Login;
