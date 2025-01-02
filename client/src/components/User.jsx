import React, { useState } from 'react';
import axios from 'axios'; 
import "../styles/Users.css";

export default function User() {
  const [area, setArea] = useState('');
  const [roomType, setRoomType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/search-rooms", {
        area,
        roomType,
        maxPrice,
      });

      setSearchResults(Array.isArray(response.data) ? response.data : []);

      console.log(searchResults);
    } catch (error) {
      console.error("Error searching rooms:", error);
      alert("Failed to search rooms. Please try again.");
    }
  };

  return (
    <>
      <nav>
        Dashboard
        <p style={{ float: "right" }}>user</p>
      </nav>

      <div className="search">
        <h2>Search for Rooms</h2>
        <form className='user-search-form' onSubmit={handleSearch}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Area"
              className="form-input"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <select
              required
              className="form-select"
              name="roomType"
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)} // 
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
          <div className="form-group range-group">
            <label htmlFor="priceRange">Price Range: </label>
            <span id="rangeValue">{maxPrice || 1000}</span>
            <input
              type="range"
              id="priceRange"
              min="1000"
              max="20000"
              step="100"
              value={maxPrice}
              onInput={(e) => {
                setMaxPrice(e.target.value);
                document.getElementById('rangeValue').textContent = e.target.value;
              }}
              name="maxPrice"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="form-button">Search</button>
          </div>
        </form>
      </div>
      <div className="card-holder">
      {searchResults.map((room, index) => (
        <div className="card" key={index}>
          <h3 className="room-type">{room.roomType}</h3>
          <p className="area">Area: {room.area}</p>
          <p className="price">Price: ₹{room.price}</p>
          <h4>Owner Details:</h4>
          <p className="owner-name">Name: {room.owner_name}</p>
          <p className="owner-contact">Contact: {room.contact_number}</p>
          <p className="owner-email">Email: {room.email}</p>
        </div>
      ))}
      </div>
    </>
  );
}
