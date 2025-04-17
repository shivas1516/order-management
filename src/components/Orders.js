import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    api.get(`/order/user/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ORDER_ID</th>
            <th>PRICE</th>
            <th>PRODUCT_ID</th>
            <th>QUANTITY</th>
            <th>STATUS</th>
            <th>USER_ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>₹{order.price}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{order.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
