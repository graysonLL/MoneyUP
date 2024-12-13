import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

function DisplayAccountDetails() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

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
      if (!token) {
        alert("Please log in again");
        return;
      }

      console.log('Submitting update with data:', formData);

      const response = await fetch("http://localhost:3001/api/auth/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      login(data.user);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error updating profile");
    }
  };

  if (!user) return <div className="error-message">Please log in to view your profile</div>;

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
                      setFormData(user);
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
                value={isEditing ? formData.firstName : user.firstName}
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
                value={isEditing ? formData.lastName : user.lastName}
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
                value={isEditing ? formData.email : user.email}
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
