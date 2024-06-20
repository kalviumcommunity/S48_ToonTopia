import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Content.css';

function Content() {
    const [cartoons, setCartoons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/cartoon');
                const data = await response.json();
                setCartoons(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="content-container" className="content-container">
            <h2 className='fav-header'>Favorite Cartoons</h2>
            <Link to="/add-entity">
                <button className="add-entity-btn">Add Entity</button>
            </Link>
            <ul className="cartoon-list">
                {cartoons.map(cartoon => (
                    <li key={cartoon._id} className="cartoon-box">
                        <h3>{cartoon.name}'s Favorite Cartoon</h3>
                        <>
                            <p className="cartoon-info"><strong>Title:</strong> {cartoon.title}</p>
                            <p className="cartoon-info"><strong>Release Date:</strong> {cartoon.release_date}</p>
                            <p className="cartoon-info"><strong>Genre:</strong> {cartoon.genre}</p>
                            <p className="cartoon-info"><strong>Description:</strong> {cartoon.description}</p>
                        </>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Content;