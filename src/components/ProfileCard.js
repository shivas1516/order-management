import React from "react";
import '../styles/theme.css';

function ProfileCard({ onClose }) {
  const email = localStorage.getItem("userEmail") || "No email available";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[var(--card-background)] p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">User Profile</h2>
        <p className="text-[var(--text-color)] mb-6"><strong>Email:</strong> {email}</p>
        <button
          onClick={onClose}
          className="w-full p-3 bg-[var(--primary-color)] text-[var(--text-secondary)] rounded-md hover:bg-[var(--primary-hover)] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;