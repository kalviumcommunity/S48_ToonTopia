// SignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css'; // You can reuse styles from App.css or create a new CSS file
import bg from '../assets/finalig1.jpg';

const SignupPage = () => {
  return (
    <>
      <div className="right-image">
        <img src={bg} alt="Right Image" />
      </div>
      <div className="toontopia-container">
        <div className="contentsignup">
          <header>
            <h1>ToonTopia</h1>
          </header>
          <main>
            <h2 className='signuph'>Sign Up for ToonTopia</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder='Enter your name' required />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder='Enter your username' required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='Enter your email address' required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder='Enter your phone number'
                    pattern="[0-9]*" // Accepts numbers only
                    required
                    />
                    </div>

              <div className="form-group">
                <label htmlFor="password">Set Password:</label>
                <input type="password" id="password" name="password" placeholder='Set your password' required />
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </main>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
