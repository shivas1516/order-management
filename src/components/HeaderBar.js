import React from "react";
import ProfileAvatarDrawer from "./ProfileAvatarDrawer";
import '../styles/theme.css';

function HeaderBar() {
  const userEmail = localStorage.getItem("userEmail") || "User";

  return (
    <header className="bg-[var(--card-background)] p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-[var(--text-color)]">Welcome, {userEmail}</h1>
      <ProfileAvatarDrawer />
    </header>
  );
}

export default HeaderBar;