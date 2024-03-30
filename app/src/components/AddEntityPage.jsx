import React, { useState } from 'react';
import axios from 'axios';
import Content from './Content'; 
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import '../css/AddEntity.css'

function AddEntity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    release_date: '',
    genre: '',
    description:'',
    created_by: Cookies.get("username")
  });

  const [entityAdded, setEntityAdded] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/cartoon', formData)
      .then((response) => {
        console.log('Entity added successfully:', response.data);
        setEntityAdded(true); 
        navigate('/content');
      })
      .catch((err) => {
        console.log('Error adding entity:', err);
      });
  };

  
  if (entityAdded) {
    return <Content />;
  }

  return (
    <div className="entity-container">
      <form className="entity-form" onSubmit={handleSubmit}>
        <h2 className="entity-form-title">Add Entity</h2>
        <input className="entity-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input className="entity-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input className="entity-input" type="text" name="release_date" value={formData.release_date} onChange={handleChange} placeholder="Release Year" required />
        <input className="entity-input" type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
        <input className="entity-input" type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <button className="entity-button" type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;

