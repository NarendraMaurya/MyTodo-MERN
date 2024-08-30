import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBrand = () => {
    if (token) {
      navigate("/todos");
    } else {
      navigate("/");
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="brand" onClick={handleBrand}>
          My To-Do List
        </h1>
        {token ? (
          <div className="auth-buttons">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="signup-btn" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
