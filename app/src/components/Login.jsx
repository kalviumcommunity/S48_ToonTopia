// Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file
import bg from '../assets/finalig1.jpg'
const Login = () => {
  return (
    <>
      <div className="right-image">
      <img src={bg} alt="Right Image" />
      </div>
      <div className="toontopia-container">
        <div className="contentlogin">
          <header>
            <h1>ToonTopia</h1>
          </header>
          <main>
            <h2 className='loginh'>Login to ToonTopia</h2>
            <form>
              <div className="form-group">
                <label htmlFor="usernameOrEmail">Username or Email:</label>
                <input type="text" id="usernameOrEmail" name="usernameOrEmail" required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>
              </div>
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
