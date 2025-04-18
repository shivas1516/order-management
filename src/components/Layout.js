import React from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import '../styles/theme.css';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background-color)]">
      <HeaderBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;