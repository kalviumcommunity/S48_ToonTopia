// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import bg from '../assets/finalig1.jpg';

const HomePage = () => {
  return (
    <>
      <div className="right-image">
        <img src={bg} alt="Right Image" />
      </div>
      <div className="toontopia-container">
        <div className="content">
          <header>
            <h1>ToonTopia</h1>
          </header>
          <main>
            <h2>Welcome to the Cartoon Paradise!</h2>
            <p>Discover a world of animated adventures at ToonTopia.</p>
            <div className="auth-buttons">
              <Link to="/signup">
                <button className="signup-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="login-button">Log In</button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;