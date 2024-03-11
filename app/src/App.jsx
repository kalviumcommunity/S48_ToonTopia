// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Content from './components/Content'; 
import AddEntityPage from './components/AddEntityPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<Content />} /> 
        <Route path="/add-entity" element={<AddEntityPage />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </Router>
  );
};

export default App;
