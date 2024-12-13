import { useState, useRef, useEffect } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Navbar.css";

function Navbar({ username }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef(null); // Add ref for the dropdown

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("HandleLogout called");
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
    console.log("After navigation");
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="user-dropdown" ref={dropdownRef}>
          {" "}
          {/* Add ref here */}
          <button
            className="username-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {username}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
