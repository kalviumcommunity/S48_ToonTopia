import React from 'react';
import './App.css';
import bg from './assets/finalig1.jpg'
const App = () => {
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
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
          </div>
        </main>
      </div>
      
    </div>
   
  </>
  );
};

export default App;
