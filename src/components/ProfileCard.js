import React from "react";
import "../styles/ProfileCard.css";

function ProfileCard({ onClose }) {
  const email = localStorage.getItem("userEmail");

  return (
    <div className="profile-card-overlay">
      <div className="profile-card">
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {email}</p>
        {/* Add other user details here if available */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProfileCard;
