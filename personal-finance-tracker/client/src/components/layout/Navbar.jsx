import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar({ username }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="user-dropdown">
          <button
            className="username-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {username}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profile")}>View Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
