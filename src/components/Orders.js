import React, { useState, useEffect } from "react";
import { sampleOrders } from "./data/sampleData";
import "../styles/theme.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const useSampleData = true; // Set to false to use API, true to use sample data

  useEffect(() => {
    // Original API call
    // const userId = localStorage.getItem("userId");
    // api.get(`/order/user/${userId}`)
    //   .then(res => setOrders(res.data))
    //   .catch(err => console.error(err));

    // Sample data for testing
    if (useSampleData) {
      const userId = localStorage.getItem("userId") || "U001"; // Default to "U001" for testing
      const filteredOrders = sampleOrders.filter(order => order.userId === userId);
      setOrders(filteredOrders);
    }
  }, [useSampleData]);

  // helper function to assign styles based on status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "inprogress":
        return "bg-yellow-100 text-yellow-700";
      case "paymentpending":
        return "bg-orange-100 text-orange-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700"; // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] p-6">
      <h2 className="text-2xl font-bold text-[var(--text-color)] text-center mb-6">My Orders</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-[var(--card-background)] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[var(--primary-color)]">
              <th className="p-3 text-[var(--text-secondary)]">ORDER_ID</th>
              <th className="p-3 text-[var(--text-secondary)]">PRICE</th>
              <th className="p-3 text-[var(--text-secondary)]">PRODUCT_ID</th>
              <th className="p-3 text-[var(--text-secondary)]">QUANTITY</th>
              <th className="p-3 text-[var(--text-secondary)]">STATUS</th>
              <th className="p-3 text-[var(--text-secondary)]">USER_ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId} className="border-b hover:bg-gray-100">
                <td className="p-3 text-[var(--text-color)]">{order.orderId}</td>
                <td className="p-3 text-[var(--text-color)]">₹{order.price}</td>
                <td className="p-3 text-[var(--text-color)]">{order.productId}</td>
                <td className="p-3 text-[var(--text-color)]">{order.quantity}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td className="p-3 text-[var(--text-color)]">{order.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
