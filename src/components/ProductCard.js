<div className="product-grid">
  {products.map(product => (
    <div key={product.productId} className="product-card">
      <h4>{product.productName}</h4>
      <p><strong>ID:</strong> {product.productId}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
    </div>
  ))}
</div>
