import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';

import LoginImg from '../../assets/login/login_img.svg';
import useLogin from '../../hooks/login/useLogin';  // Import the custom hook
const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, login } = useLogin(); // Destructure the login logic and state from the custom hook



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    await login(email, password);
  };
  
  return (
    <div className="login-section">
      <div className="login-ls">
        <img src={LoginImg} alt="Login" />
      </div>
  
      <div className="login-rs">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error in red */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};  

export default LoginSection;
