import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <div className="login-page">
      <div className="login-card" data-animate="fade-in">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue your artistic journey.</p>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Sign In
          </button>
        </form>

        <p className="signup-prompt">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
