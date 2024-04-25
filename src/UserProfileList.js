// src/components/UserProfileList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://your-backend-url/profiles/');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>User Profiles</h1>
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredProfiles.map(profile => (
          <li key={profile.id}>
            <img src={`http://your-backend-url/${profile.avatar}`} alt="Avatar" />
            <h2>{profile.username}</h2>
            <p>{profile.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileList;
