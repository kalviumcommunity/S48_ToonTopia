import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css'; // You can reuse styles from App.css or create a new CSS file
import bg from '../assets/finalig1.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Signup successful');
        // Redirect or show success message
      } else {
        console.error('Signup failed');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error, show error message, etc.
    }
  };

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
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder='Enter your name' onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder='Enter your username' onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder='Enter your email address' onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder='Enter your phone number'
                  pattern="[0-9]*"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Set Password:</label>
                <input type="password" id="password" name="password" placeholder='Set your password' onChange={handleInputChange} required />
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
