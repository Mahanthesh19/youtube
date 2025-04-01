import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      if (storedUsers.some((user) => user.email === userData.email)) {
        setError("Email is already registered.");
        return;
      }
      const newUser = { username: userData.username, email: userData.email, password: userData.password };
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
      login(newUser);
    } else {
      const foundUser = storedUsers.find((user) => user.email === userData.email && user.password === userData.password);
      if (foundUser) {
        login(foundUser);
        navigate('/')
      } else {
        setError("Invalid email or password.");
        return;
      }
    }

    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Create Account" : "Login"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input className="login-input" type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
        )}
        <input className="login-input" type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
        <input className="login-input" type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <br></br>
        <button className="login-btn" type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)} className="toggle-link">
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
