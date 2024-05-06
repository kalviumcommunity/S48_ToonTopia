import React, { useState } from 'react';
import axios from 'axios';
import Content from './Content'; 

function AddEntity() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    release_date: '',
    genre: '',
    description:''
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
    <div className="add-entity">
      <form onSubmit={handleSubmit}>
        <h2>Add Entity</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="release_date" value={formData.release_date} onChange={handleChange} placeholder="Release date" required />
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;