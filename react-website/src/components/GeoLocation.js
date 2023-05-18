import React, { useState } from 'react';
import axios from 'axios';

const GeoLocation = () => {
  const [ip, setIP] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIPChange = (e) => {
    setIP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ip) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/geolocation', { ip });
      setResult(response.data.result);
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while fetching the geolocation data.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>IP Geolocation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ip} onChange={handleIPChange} placeholder="Enter IP Address" />
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Geolocation'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h3>Geolocation Result:</h3>
          <p>IP Address: {result.ip}</p>
          <p>Country: {result.country_name}</p>
          <p>City: {result.city}</p>
          <p>Latitude: {result.latitude}</p>
          <p>Longitude: {result.longitude}</p>
          
        </div>
      )}
    </div>
  );
};

export default GeoLocation;
