
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddEntityPage from './components/AddEntityPage';
const App = () => {
  return (
<Router>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
  <Route path="/add-entity" element={<AddEntityPage />} />
        <Route path="/content" element={<Content />} />
</Routes>
</Router>
);
};