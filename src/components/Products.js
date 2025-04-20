import React, { useState, useEffect } from "react";
import { sampleProducts } from "./data/sampleData";
import "../styles/theme.css";
import { useOrders } from "../contexts/OrdersProvider";

/**
 * Products Component
 * 
 * Displays product catalog and allows users to place orders
 * Features:
 * - Displays product cards in a responsive grid
 * - Shows product details including price, stock, and category
 * - Allows quantity adjustment with increment/decrement buttons
 * - Provides order placement functionality
 * - Updates local stock information after orders are placed
 */
function Products() {
  // State for products and quantity selection
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  
  // Get addOrder function from OrdersContext
  const { addOrder } = useOrders();
  
  // Toggle between API data and sample data
  const useSampleData = true; // Set to false to use API, true to use sample data

  // Load products on component mount
  useEffect(() => {
    // Original API call (commented out)
    // api.get("/product/allproducts")
    //   .then(res => {
    //     setProducts(res.data);
    //     initializeQuantities(res.data);
    //   })
    //   .catch(err => console.error(err));

    // Sample data for testing
    if (useSampleData) {
      setProducts(sampleProducts);
      initializeQuantities(sampleProducts);
    }
  }, [useSampleData]);

  /**
   * Initialize quantity state for each product
   * Sets default quantity to 1 for all products
   * 
   * @param {Array} productsData - Array of products to initialize quantities for
   */
  const initializeQuantities = (productsData) => {
    const initialQuantities = {};
    productsData.forEach(product => {
      initialQuantities[product.productId] = 1;
    });
    setQuantities(initialQuantities);
  };

  /**
   * Handle quantity change for a product
   * Ensures quantity is within valid range (1 to available stock)
   * 
   * @param {string} productId - ID of the product to update quantity for
   * @param {number} value - New quantity value
   */
  const handleQuantityChange = (productId, value) => {
    const product = products.find(p => p.productId === productId);
    if (!product) return;
    
    // Ensure quantity is between 1 and available stock
    const newValue = Math.max(1, Math.min(value, product.stock || 1));
    
    setQuantities(prev => ({
      ...prev,
      [productId]: newValue
    }));
  };

  /**
   * Handle placing an order for a product
   * Creates order, updates stock, and shows confirmation
   * 
   * @param {Object} product - The product to order
   */
  const placeOrder = (product) => {
    const quantity = quantities[product.productId] || 1;
    
    // Check if enough stock is available
    if (product.stock < quantity) {
      alert("Not enough stock available!");
      return;
    }

    // Create order object
    const newOrder = {
      productId: product.productId,
      productName: product.productName,
      quantity: quantity,
      price: product.price * quantity
    };

    // Add order using context function
    const order = addOrder(newOrder);
    
    // Update local product stock
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.productId === product.productId 
          ? { ...p, stock: p.stock - quantity } 
          : p
      )
    );

    // Show confirmation
    alert(`Order placed successfully! Order ID: ${order.orderId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] p-6">
      <h2 className="text-3xl font-bold text-[var(--text-color)] text-center mb-10">
        Product Catalog
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.productId}
            className="bg-[var(--card-background)] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="bg-[var(--primary-color)] h-3" />
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)]">
                  {product.productName}
                </h3>
                <span className="px-3 py-1 bg-[var(--background-color)] text-[var(--text-color)] text-sm rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="text-[var(--text-color)] opacity-80 text-base mb-6">
                ID: {product.productId}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="font-bold text-xl text-[var(--text-color)]">
                  ₹{product.price}
                </div>
                <div className={`text-sm px-3 py-1 rounded-full ${
                  product.stock > 10
                    ? "bg-green-100 text-green-800"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </div>
              </div>
              
              {/* Order placement section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[var(--text-color)] font-medium">Quantity:</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleQuantityChange(product.productId, (quantities[product.productId] || 1) - 1)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l"
                      disabled={product.stock <= 0}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product.productId] || 1}
                      onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-y border-gray-200 py-1"
                      disabled={product.stock <= 0}
                    />
                    <button 
                      onClick={() => handleQuantityChange(product.productId, (quantities[product.productId] || 1) + 1)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r"
                      disabled={product.stock <= 0}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => placeOrder(product)}
                  disabled={product.stock <= 0}
                  className={`w-full py-2 rounded-md text-white font-medium ${
                    product.stock <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--primary-color)] hover:opacity-90"
                  }`}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;