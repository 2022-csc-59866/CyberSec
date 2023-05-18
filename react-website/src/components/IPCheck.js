import React, { useState } from 'react';
import axios from 'axios';

const IPCheck = () => {
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
      const response = await axios.post('/check-ip', { ip });
      setResult(response.data.result);
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while searching the IP address.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>IP Address Search</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ip} onChange={handleIPChange} placeholder="Enter IP Address" />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h3>Search Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IPCheck;
