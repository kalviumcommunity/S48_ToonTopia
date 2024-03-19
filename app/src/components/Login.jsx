import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import bg from '../assets/finalig1.jpg';
import Cookies from 'universal-cookie';

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Logged in as:', data.username);
        cookies.set('username', data.username);
        navigate('/content');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

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
            <h2 className="loginh">Login to ToonTopia</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Login</button>
              {error && <p className="error-message">{error}</p>}
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
