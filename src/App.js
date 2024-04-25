import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProfiles = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list/profile/?search=${query}`);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    fetchProfiles(searchQuery);
  };

  const filteredProfiles = profiles.filter(profile => {
    return profile.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    
    <div className="container">
      <h1 className="title">User Profiles</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearchSubmit} className="search-button">Search</button>
      </div>
      {searchQuery && (
        <ul className="profile-list">
          {filteredProfiles.map(profile => (
            <li key={profile.id} className="profile-item">
              <div className="profile-content">
                <img src={profile.avatar} alt={profile.username} className="profile-avatar" />
                <div className="profile-details">
                  <h2 className="profile-username">{profile.username}</h2>
                  <p className="profile-bio">{profile.bio}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
