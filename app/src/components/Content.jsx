import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Content.css';

function Content() {
  const [cartoons, setCartoons] = useState([]);
  const [selectedCartoon, setSelectedCartoon] = useState(null); 
  const [updatedCartoonData, setUpdatedCartoonData] = useState({}); 
  const [users, setUsers] = useState([]);  //added
  const [selectedUser, setSelectedUser] = useState(''); //added
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {    //added
    fetchData();
    fetchUsers();
  }, [selectedUser]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/cartoon');
      setCartoons(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/signup');
      setUsers(response.data.map(user => user.username));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredCartoons = selectedUser
  ? cartoons.filter(cartoon => cartoon.created_by === selectedUser)
  : cartoons;
  
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

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
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    navigate('/login');
  };

  return (
    <>
      <div id="content-container" className="content-container">
        <h2 className="fav-header">Favorite Cartoons</h2>
        <div>
          <label htmlFor="userDropdown">Select User:</label>
          <select id="userDropdown" value={selectedUser} onChange={handleUserChange}>
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user} value={user.created_by}>{user}</option>
            ))}
          </select>
        </div>
        <Link to="/add-entity">
          <button className="add-entity-btn">Add Entity</button>
        </Link>
        <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
        <ul className="cartoon-list">
          {cartoons.filter(item=>item.created_by===selectedUser).map((cartoon) => (
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

