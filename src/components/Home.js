import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/theme.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="flex flex-row items-center space-x-6">
        <button
          onClick={() => navigate("/products")}
          className="w-48 h-48 bg-[var(--primary-color)] text-[var(--text-secondary)] rounded-2xl hover:bg-[var(--primary-hover)] transition text-lg font-semibold shadow-md flex items-center justify-center"
        >
          View All Products
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="w-48 h-48 bg-[var(--primary-color)] text-[var(--text-secondary)] rounded-2xl hover:bg-[var(--primary-hover)] transition text-lg font-semibold shadow-md flex items-center justify-center"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default Home;
