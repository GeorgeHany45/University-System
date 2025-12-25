import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("teacher");
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
    ? "http://localhost:5001/api/users/signup"
    : "http://localhost:5001/api/users/login";
  
    const payload = isSignUp
      ? { username, email, password, role }
      : { username, password, role };

    try {
      const res = await fetch(url,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);
      
      if (res.ok && data.userId) {
        // Save user info for later use
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        if (data.username) {
          localStorage.setItem("username", data.username);
        }

        // Redirect ALL users to home page
        navigate("/home");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="container login-container">
      <div className="login-card">
        <h2>University Management System</h2>
        <p>Select your role and enter your credentials</p>

        {/* Role Tabs */}
        <div className="role-tabs">
          <button
            className={role === "teacher" ? "role active" : "role"}
            onClick={() => handleRoleChange("teacher")}
          >
            Teacher
          </button>
          <button
            className={role === "admin" ? "role active" : "role"}
            onClick={() => handleRoleChange("admin")}
          >
            Admin
          </button>
          <button
            className={role === "student" ? "role active" : "role"}
            onClick={() => handleRoleChange("student")}
          >
            Student
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {isSignUp && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="applybutton">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle */}
        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
