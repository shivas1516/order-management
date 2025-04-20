import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * OrdersContext - Manages the state and operations for orders across the application
 * 
 * This context provides:
 * 1. Central state management for orders
 * 2. Methods to add new orders
 * 3. Methods to retrieve user-specific orders
 * 4. Cross-tab synchronization using localStorage and the storage event
 * 5. Persistence of orders between page refreshes
 */
export const OrdersContext = createContext();

/**
 * Custom hook to access the OrdersContext
 * Ensures the hook is used within an OrdersProvider
 * 
 * @returns {Object} The orders context value
 */
export const useOrders = () => {
  const context = useContext(OrdersContext);
  
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  
  return context;
};

/**
 * OrdersProvider Component - Wraps the application to provide order-related functionality
 * 
 * Features:
 * - Maintains orders state across the application
 * - Loads orders from localStorage on initialization
 * - Listens for changes to localStorage from other tabs
 * - Provides methods to add and retrieve orders
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const OrdersProvider = ({ children }) => {
  // State to hold the orders
  const [orders, setOrders] = useState([]);
  
  // Load orders from localStorage on initial render and set up event listeners
  useEffect(() => {
    /**
     * Loads orders from localStorage and updates the state
     * Includes error handling for invalid JSON
     */
    const loadOrdersFromStorage = () => {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error("Failed to parse orders from localStorage:", error);
          localStorage.setItem("orders", JSON.stringify([]));
          setOrders([]);
        }
      } else {
        localStorage.setItem("orders", JSON.stringify([]));
        setOrders([]);
      }
    };
    
    // Load orders when component mounts
    loadOrdersFromStorage();
    
    /**
     * Handle storage events from other tabs
     * Updates the orders state when changes are detected
     */
    const handleStorageChange = (event) => {
      if (event.key === "orders") {
        loadOrdersFromStorage();
      }
    };
    
    // Add event listener for storage events
    window.addEventListener("storage", handleStorageChange);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  /**
   * Adds a new order to localStorage and state
   * Generates a unique order ID and timestamps the order
   * 
   * @param {Object} newOrder - The order details to add
   * @returns {Object} The complete order object that was added
   */
  const addOrder = (newOrder) => {
    // Generate a unique order ID based on timestamp
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    
    // Get current user ID from localStorage or use default
    const userId = localStorage.getItem("userId") || "U001";
    
    // Create timestamp for the order
    const timestamp = new Date().toISOString();
    
    // Construct the complete order object
    const orderToAdd = {
      orderId,
      userId,
      timestamp,
      status: "new",
      ...newOrder
    };
    
    // Get current orders directly from localStorage to avoid race conditions
    const currentOrdersStr = localStorage.getItem("orders");
    const currentOrders = currentOrdersStr ? JSON.parse(currentOrdersStr) : [];
    const updatedOrders = [...currentOrders, orderToAdd];
    
    // Update localStorage and state
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    
    return orderToAdd;
  };
  
  /**
   * Retrieves orders for the current user
   * Filters orders based on the userId stored in localStorage
   * 
   * @returns {Array} Array of orders for the current user
   */
  const getUserOrders = () => {
    const userId = localStorage.getItem("userId") || "U001";
    return orders.filter(order => order.userId === userId);
  };
  
  // Context value provided to consumers
  const value = {
    orders,
    addOrder,
    getUserOrders
  };
  
  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};