const sampleProducts = [
    {
      productId: "P001",
      productName: "Laptop",
      price: 50000,
      category: "Electronics",
      stock: 10,
    },
    {
      productId: "P002",
      productName: "Smartphone",
      price: 15000,
      category: "Electronics",
      stock: 25,
    },
    {
      productId: "P003",
      productName: "Headphones",
      price: 2000,
      category: "Accessories",
      stock: 50,
    },
  ];
  
  const sampleOrders = [
    {
      orderId: "O001",
      price: 299,
      productId: "P001",
      quantity: 2,
      status: "new",
      userId: "U001",
    },
    {
      orderId: "O002",
      price: 499,
      productId: "P002",
      quantity: 1,
      status: "inprogress",
      userId: "U001",
    },
    {
      orderId: "O003",
      price: 150,
      productId: "P003",
      quantity: 3,
      status: "paymentpending",
      userId: "U001",
    },
    {
      orderId: "O004",
      price: 999,
      productId: "P004",
      quantity: 1,
      status: "completed",
      userId: "U001",
    },
  ];
  
  export { sampleProducts, sampleOrders };