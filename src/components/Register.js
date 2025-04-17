import React, { useState } from "react";
import axios from "axios";
import '../styles/Register.css';  // for styling
function Register() {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      address: "",
      paymentType: "Credit Card",  // default selection
      paymentId: "",
      password: "",
      validityYear: ""
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
      <div className="register-container">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
  
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
  
          <select name="paymentType" value={formData.paymentType} onChange={handleChange} required>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
  
          <input type="text" name="paymentId" placeholder="Payment ID" value={formData.paymentId} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="number" name="validityYear" placeholder="Validity Year" value={formData.validityYear} onChange={handleChange} required />
  
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  
  export default Register;