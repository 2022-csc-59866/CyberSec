import React, { useState } from 'react';
import axios from 'axios';

const Check = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/check-url', { url });
      const result = response.data.result;

      if (result.safe) {
        setMessage('The URL is safe.');
      } else {
        setMessage('The URL is not safe.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while checking the URL.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>URL Safety Check</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL" />
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Check;
