import React from "react";
import "../styles/Profile.css";
import DisplayAccountDetails from "../components/profile/DisplayAccountDetails";
import EditAccountDetails from "../components/profile/EditAccountDetails";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-content-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <EditAccountDetails />
        </div>

        <div className="profile-content">
          <DisplayAccountDetails
            firstName="dan"
            lastName="dan"
            email="dan@dan.com"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
