import React, { useState } from "react";
import axios from "axios";
import '../index.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", mobileNumber: "", address: "",
    paymentType: "Credit Card", paymentId: "", password: "", validityYear: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/user/register", formData)
      .then(response => {
        alert("User registered successfully!");
        console.log(response.data);
      })
      .catch(error => {
        alert("Registration failed!");
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[var(--card-background)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color)]">User Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
          <input
            type="text"
            name="paymentId"
            placeholder="Payment ID"
            value={formData.paymentId}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="number"
            name="validityYear"
            placeholder="Validity Year"
            value={formData.validityYear}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-hover)] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;