import React, { useState, useEffect } from "react";
import { sampleProducts } from "./data/sampleData";
import "../styles/theme.css";

function Products() {
  const [products, setProducts] = useState([]);
  const useSampleData = true; // Set to false to use API, true to use sample data

  useEffect(() => {
    // Original API call
    // api.get("/product/allproducts")
    //   .then(res => setProducts(res.data))
    //   .catch(err => console.error(err));
    
    // Sample data for testing
    if (useSampleData) {
      setProducts(sampleProducts);
    }
  }, [useSampleData]);

  return (
    <div className="min-h-screen bg-[var(--background-color)] p-6">
      <h2 className="text-3xl font-bold text-[var(--text-color)] text-center mb-10">Product Catalog</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.productId}
            className="bg-[var(--card-background)] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-64"
          >
            <div className="bg-[var(--primary-color)] h-3" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)]">{product.productName}</h3>
                <span className="px-3 py-1 bg-[var(--background-color)] text-[var(--text-color)] text-sm rounded-full">
                  {product.category}
                </span>
              </div>
              
              <div className="text-[var(--text-color)] opacity-80 text-base mb-6">
                ID: {product.productId}
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <div className="font-bold text-xl text-[var(--text-color)]">₹{product.price}</div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;