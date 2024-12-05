import React from "react";

function DisplayAccountDetails({ firstName, lastName, email }) {
  return (
    <div className="profile-form">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          disabled
          className="profile-input"
        />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          disabled
          className="profile-input"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} disabled className="profile-input" />
      </div>
    </div>
  );
}

export default DisplayAccountDetails;
