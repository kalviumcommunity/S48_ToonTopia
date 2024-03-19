import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Content.css';

function Content() {
  const [cartoons, setCartoons] = useState([]);
  const [selectedCartoon, setSelectedCartoon] = useState(null); 
  const [updatedCartoonData, setUpdatedCartoonData] = useState({}); 
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/cartoon');
      setCartoons(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (cartoon) => {
    setSelectedCartoon(cartoon); 
    setUpdatedCartoonData(cartoon);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCartoonData({ ...updatedCartoonData, [name]: value });
  };

  const handleCancel = () => {
    setSelectedCartoon(null); 
    setUpdatedCartoonData({}); 
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3002/cartoon/${selectedCartoon._id}`, updatedCartoonData);
      console.log('Entity updated successfully');
      fetchData(); 
      setSelectedCartoon(null);
      setUpdatedCartoonData({}); 
    } catch (error) {
      console.error('Error updating entity:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/cartoon/${id}`);
      console.log('Entity deleted successfully');
      fetchData(); 
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  const handleLogout = () => {
    // Clear the cookie by setting its expiration date to the past
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // After clearing the cookie, navigate to the login page
    navigate('/login');
  };

  return (
    <>
      <div id="content-container" className="content-container">
        <h2 className="fav-header">Favorite Cartoons</h2>
        <Link to="/add-entity">
          <button className="add-entity-btn">Add Entity</button>
        </Link>
        <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
        <ul className="cartoon-list">
          {cartoons.map((cartoon) => (
            <li key={cartoon._id} className="cartoon-box">
              <h3>{cartoon.name}'s Favorite Cartoon</h3>
              <>
                <p className="cartoon-info"><strong>Title:</strong> {cartoon.title}</p>
                <p className="cartoon-info"><strong>Release Year:</strong> {cartoon.release_date}</p>
                <p className="cartoon-info"><strong>Genre:</strong> {cartoon.genre}</p>
                <p className="cartoon-info"><strong>Description:</strong> {cartoon.description}</p>
                {selectedCartoon && selectedCartoon._id === cartoon._id ? (
                  <div>
                    <input type="text" name="title" value={updatedCartoonData.title} onChange={handleChange} placeholder="Title" required />
                    <input type="text" name="release_date" value={updatedCartoonData.release_date} onChange={handleChange} placeholder="Release Year" required />
                    <input type="text" name="genre" value={updatedCartoonData.genre} onChange={handleChange} placeholder="Genre" required />
                    <input type="text" name="description" value={updatedCartoonData.description} onChange={handleChange} placeholder="Description" required />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <div className='button-container'>
                    <button onClick={() => handleUpdate(cartoon)}>Update</button>
                    <button onClick={() => handleDelete(cartoon._id)}>Delete</button>
                  </div>
                )}
              </>
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
}

export default Content;
