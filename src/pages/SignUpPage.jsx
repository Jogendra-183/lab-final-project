import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const SignUpPage = () => {
  const [role, setRole] = useState("viewer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, authError, isLoading } = useAuth();
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }

    try {
      const user = await signup(fullName, email, password, role);
      if (user.role === "artist") navigate("/artist-dashboard");
      else if (user.role === "curator") navigate("/curator-dashboard");
      else navigate("/visitor-dashboard");
    } catch {
      setLocalError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-split">
      <div
        className="auth-split-image"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2000&auto=format&fit=crop')" }}
        data-animate="blur-up"
      >
        <div className="auth-overlay">
          <h1 data-animate="fade-up">Join ArtConnect</h1>
          <p data-animate="fade-up">“Art speaks where words are unable to explain.”</p>
        </div>
      </div>

      <div className="auth-split-form">
        <div className="auth-card" data-animate="zoom-in">
          <h2>Create Account</h2>
          <p className="auth-sub">Begin your journey with the world's finest artists.</p>

          {(authError || localError) && <p className="auth-error">{authError || localError}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g., Alex Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label style={{ marginTop: "1rem" }}>I am a...</label>
            <div className="role-group">
              {["viewer", "artist", "curator"].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={role === r ? "active" : ""}
                  onClick={() => setRole(r)}
                  data-animate="fade-up"
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <button className="btn-primary full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
