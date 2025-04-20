import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (formData.paymentType === "UPI") {
      setFormData(prev => ({ ...prev, validityYear: "" }));
    }
  }, [formData.paymentType]);

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
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-[var(--card-background)] p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color)]">User Registration</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">Personal Information</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">Payment Details</label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  name="paymentId"
                  placeholder={formData.paymentType === "UPI" ? "UPI ID" : "Payment ID"}
                  value={formData.paymentId}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              
              {formData.paymentType !== "UPI" && (
                <div className="mb-4">
                  <input
                    type="number"
                    name="validityYear"
                    placeholder="Validity Year"
                    value={formData.validityYear}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    required={formData.paymentType !== "UPI"}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[var(--text-color)]">Security</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-hover)] transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;