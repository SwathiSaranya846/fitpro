import React, { useState } from "react";
import { Zap, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await onLogin(email, password);

    if (!result.success) {
      setError(result.message || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Zap size={32} />
        </div>

        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your fitness journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">⚠️ {error}</div>}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-remember">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn">
            <Chrome size={18} /> Google
          </button>
          <button className="social-btn">📘 Apple</button>
        </div>

        <div className="auth-switch">
          Don't have an account? // In Login.js, change: //{" "}
          <span onClick={onRegister}>Sign Up</span>
          // To toggle between Register and Login:
          <span
            onClick={() => {
              // This should switch to register view
              window.location.href = "/register";
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}
