import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; 
import Home from "./components/Home";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Layout from "./components/Layout";
import { OrdersProvider } from "./contexts/OrdersProvider";

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App;
