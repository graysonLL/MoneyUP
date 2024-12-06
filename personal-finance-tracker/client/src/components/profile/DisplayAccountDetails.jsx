import React, { useState, useEffect } from "react";

function DisplayAccountDetails() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3001/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUserDetails(data);
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setError("Failed to load profile. Please try logging in again.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting with token:", token ? "Present" : "Missing");
      console.log("Form data:", formData);

      if (!token) {
        alert("Please log in again");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          }),
        }
      );

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Profile updated successfully!");
        setUserDetails(data.user);
        setIsEditing(false);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-content-container">
        <div className="profile-content">
          <div className="profile-header">
            <h1>Profile Settings</h1>
            <div className="profile-header-actions">
              {!isEditing ? (
                <button
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Account Details
                </button>
              ) : (
                <div className="button-group">
                  <button
                    onClick={handleSubmit}
                    className="save-changes-profile-button"
                  >
                    Save Changes
                  </button>
                  <button
                    className="cancel-button-profile"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(userDetails);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={isEditing ? formData.firstName : userDetails.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={isEditing ? formData.lastName : userDetails.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={isEditing ? formData.email : userDetails.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayAccountDetails;
