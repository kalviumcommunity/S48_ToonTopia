import React, { useState, useEffect } from 'react';
import '../css/Content.css'; 

function Content() {
  const [cartoons, setCartoons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/cartoon')
      .then(response => response.json())
      .then(data => setCartoons(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2 className='fav'>Favorite Cartoons</h2>
      <ul>
        {cartoons.map(cartoon => (
          <li key={cartoon._id} className="box">
            <h3>{cartoon.name}'s Favorite Cartoon</h3>
            <p>Title: {cartoon.favorite_cartoon.title}</p>
            <p>Release Date: {cartoon.favorite_cartoon.release_date}</p>
            <p>Genre: {cartoon.favorite_cartoon.genre}</p>
            <p>Description: {cartoon.favorite_cartoon.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
