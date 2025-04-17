import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import '../styles/theme.css';

function ProfileAvatarDropdown() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleProfile = () => {
    setShowProfile(true);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-[var(--text-color)] hover:bg-gray-400 transition cursor-pointer"
      >
        <span className="text-sm">👤</span>
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 top-12 w-48 bg-[var(--card-background)] shadow-lg rounded-md py-1 z-50">
          <button
            onClick={handleProfile}
            className="w-full text-left px-4 py-2 text-[var(--text-color)] hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-[var(--text-color)] hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
      
      {showProfile && <ProfileCard onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default ProfileAvatarDropdown;