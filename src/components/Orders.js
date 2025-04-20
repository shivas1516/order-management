import React, { useState, useEffect } from "react";
import "../styles/theme.css";
import { useOrders } from "../contexts/OrdersProvider";

/**
 * Orders Component
 * 
 * Displays orders for the current user in a table format
 * Features:
 * - Shows order details including ID, price, product, quantity, status, and user ID
 * - Automatically updates when orders change
 * - Refreshes when tab becomes visible
 * - Color-coded status indicators
 * - Cross-tab synchronization
 */
function Orders() {
  const { getUserOrders } = useOrders();
  const [userOrders, setUserOrders] = useState([]);
  
  // Update orders whenever component renders or tab is focused
  useEffect(() => {
    /**
     * Update the orders state with the latest orders from context
     */
    const updateOrders = () => {
      setUserOrders(getUserOrders());
    };
    
    // Update on mount
    updateOrders();
    
    /**
     * Handle tab visibility changes
     * Updates orders when tab becomes visible again
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateOrders();
      }
    };
    
    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Regular polling for updates (as a fallback)
    const intervalId = setInterval(updateOrders, 3000);
    
    // Clean up event listeners and interval on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [getUserOrders]);

  /**
   * Get the appropriate CSS classes for status styling
   * 
   * @param {string} status - The order status
   * @returns {string} CSS classes for the status badge
   */
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
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
      <h2 className="text-2xl font-bold text-[var(--text-color)] text-center mb-6">
        My Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-[var(--card-background)] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[var(--primary-color)]">
              <th className="p-3 text-[var(--text-secondary)]">ORDER ID</th>
              <th className="p-3 text-[var(--text-secondary)]">PRICE</th>
              <th className="p-3 text-[var(--text-secondary)]">PRODUCT ID</th>
              <th className="p-3 text-[var(--text-secondary)]">QUANTITY</th>
              <th className="p-3 text-[var(--text-secondary)]">STATUS</th>
              <th className="p-3 text-[var(--text-secondary)]">USER ID</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <tr key={order.orderId} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-[var(--text-color)]">{order.orderId}</td>
                  <td className="p-3 text-[var(--text-color)]">₹{order.price}</td>
                  <td className="p-3 text-[var(--text-color)]">{order.productId}</td>
                  <td className="p-3 text-[var(--text-color)]">{order.quantity}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--text-color)]">{order.userId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-[var(--text-color)]">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;