import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/random-user');
        const userData = response.data.user;

        const user = {
          name: `${userData.name.first} ${userData.name.last}`,
          email: userData.email,
          location: `${userData.location.city}, ${userData.location.country}`,
        };

        setUser(user);
      } catch (error) {
        console.error('An error occurred:', error);
        setError('An error occurred while fetching the random user data.');
      }

      setLoading(false);
    };

    fetchRandomUser();
  }, []);

  return (
    <div>
      <h2>Random User</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Location: {user.location}</p>
        </div>
      ) : null}
      <p>Ps.Refresh the page for a new fake user.</p>
    </div>
  );
};

export default RandomUser;
