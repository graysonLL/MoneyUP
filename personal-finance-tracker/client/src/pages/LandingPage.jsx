import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import LandingPageNavbar from "../components/landing/LandingPageNavbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LandingPage() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Savings",
        data: [1000, 1500, 2000, 2400, 2800, 3500],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: [800, 1200, 1100, 1400, 1300, 1500],
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Financial Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
            <div className="hero-chart">
              <Line data={chartData} options={chartOptions} />
            </div>
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
