import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todos");
    }
  }, []);

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="landing-container">
      <header className="main">
        <h2>Stay Organized, Stay Productive</h2>
        <p>
          Manage your tasks easily with our intuitive to-do list application.
        </p>
        <button className="get-started-btn" onClick={handleSignup}>
          Get Started
        </button>
      </header>
    </div>
  );
};

export default LandingPage;
