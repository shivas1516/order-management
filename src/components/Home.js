import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";

function Home() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>Welcome, {userEmail}</h1>
      <div className="button-group">
        <button onClick={() => navigate("/products")}>View All Products</button>
        <button onClick={() => navigate("/orders")}>View My Orders</button>
      </div>
      <div className="profile-section">
        <button onClick={() => setShowProfile(true)}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {showProfile && <ProfileCard onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default Home;
