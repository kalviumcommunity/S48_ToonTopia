import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/SignUp.css';
import bg from '../assets/finalig1.jpg';
import Cookies from 'universal-cookie';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3002/cartoon');
  //     // Process the response data as needed
  //     console.log('Data fetched successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/signup', formData);
      if (response.status === 201) {
        console.log('Signup successful');
        cookies.set('username', formData.username, { path: '/' });
        navigate('/content');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
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

export default SignUp;
