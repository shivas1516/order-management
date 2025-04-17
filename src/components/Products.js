import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/product/allproducts")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="products-container">
      <h2>Product Catalog</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.productId}>
            <h3>{product.productName}</h3>
            <p><strong>ID:</strong> {product.productId}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
