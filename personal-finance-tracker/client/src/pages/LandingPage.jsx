import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import LandingPageNavbar from "../components/landing/LandingPageNavbar";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <LandingPageNavbar />

      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Take Control of
              <br />
              Your
              <br />
              <span className="highlight">Financial Future</span>
            </h1>
            <p className="hero-description">
              Track expenses, manage budgets, and achieve your financial goals
              with our easy-to-use personal finance management tool.
            </p>
            <button onClick={() => navigate("/signup")} className="cta-button">
              Start Free Today
            </button>
          </div>
          <div className="hero-image">
            <img alt="Financial Management" />
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-content">
          <h2 className="features-title">
            Everything you need to manage your money
          </h2>
          <p className="features-description">
            Simple yet powerful tools to help you make better financial
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
