import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import authService from "../services/authService";
import "../styles/Signup.css";
// 🟢 ADDED:
// Google OAuth temporarily disabled (MongoDB auth in use)

// 🔹 Helper function for password validation (consistent with Login.jsx)
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Add at least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Add at least one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Add at least one number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Add at least one special symbol (!@#$%^&*)");
  return errors;
};

const Signup = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordErrors, setPasswordErrors] = useState([]); // Add state for password errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Perform client-side password validation before submitting
    const errors = validatePassword(formData.password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await authService.signup(formData);
      // On successful signup, navigate to the login page
      navigate("/login");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // 🔹 Real-time password validation
    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };

  const isDark = theme === "dark";

  // Temporarily disable Google signup handlers
  /*
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user data:", decoded);

      // send to backend for signup/login
      const response = await googleLogin(credentialResponse.credential);

      console.log("Backend signup success:", response);
      alert("Signed up successfully with Google!");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google signup failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.log("Google signup failed");
  };
  */

  return (
    <div className={`signup-container ${isDark ? "signup-dark" : "signup-light"}`}>
      <Link to="/" className="signup-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="signup-wrapper">
        <div className="signup-header">
          <div className="signup-icon-container">
            <UserPlus className="signup-icon" />
          </div>
          <h1 className="signup-title">Create an Account</h1>
          <p className="signup-subtitle">Join us and start visualizing algorithms</p>
        </div>

        <div className="signup-card">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-container">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <div className="input-icon"><Mail className="icon" /></div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <div className="input-icon"><Lock className="icon" /></div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </span>
              </div>

              {passwordErrors.length > 0 && (
                <ul className="password-errors">
                  {passwordErrors.map((err, idx) => (
                    <li key={idx} className="error-text">❌ {err}</li>
                  ))}
                </ul>
              )}
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign up"}
            </button>

            <div className="login-link">
              <p className="login-text">
                Already have an account?{" "}
                <Link to="/login" className="login-action">Log in</Link>
              </p>
            </div>
          </form>

          {/* Google signup disabled while focusing on MongoDB auth */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
