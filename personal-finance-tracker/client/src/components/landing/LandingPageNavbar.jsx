import { useNavigate } from "react-router-dom";
import "../../styles/LandingPageNavbar.css";

function LandingPageNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbarLanding">
      <div className="navbarLanding">
        <div className="navbarLanding-content">
          <div className="logoNavbarLanding">
            <h1>Money</h1>
            <span className="highlight">Up</span>
          </div>
          <div className="nav-buttons">
            <span onClick={() => navigate("/login")} className="login-text">
              Login
            </span>
            <button onClick={() => navigate("/signup")} className="signup-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingPageNavbar;
