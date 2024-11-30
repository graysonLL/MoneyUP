import React from "react";
import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-content-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <button className="edit-profile-btn">Edit Account Details</button>
        </div>

        <div className="profile-content">
          <div className="profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value="dan"
                disabled
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value="dan"
                disabled
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value="dan@dan.com"
                disabled
                className="profile-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
