import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [disposable, setDisposable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/verify-email', { email });
      setDisposable(response.data.disposable);
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while verifying the email.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={handleEmailChange} placeholder="Enter Email" />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {disposable !== null && (
        <p>The email {email} is {disposable ? 'disposable' : 'not disposable'}.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
