import React, { useState } from 'react';
import axios from 'axios';

function UserAuth() {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const registerUser = async () => {
    const res = await axios.post("http://localhost:8080/user/register", registerData);
    alert("User Registered: " + res.data.name);
  };

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/login", loginData);
      setToken(res.data);
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>User Register</h2>
      <input placeholder="Name" onChange={(e) => setRegisterData({...registerData, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setRegisterData({...registerData, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setRegisterData({...registerData, password: e.target.value})} />
      <button onClick={registerUser}>Register</button>

      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
      <button onClick={loginUser}>Login</button>

      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default UserAuth;
