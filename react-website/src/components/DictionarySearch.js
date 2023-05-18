import React, { useState } from 'react';

const DictionarySearch = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!word) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/search?word=${word}`);
      const data = await response.json();

      if (response.ok) {
        const result = data.result;
        const firstDefinition = result[0]?.meanings[0]?.definitions[0]?.definition;
        setDefinition(firstDefinition || 'No definition found.');
      } else {
        setError('An error occurred while fetching the definition.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while fetching the definition.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Dictionary Search</h2>
      <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
      <button onClick={handleSearch} disabled={loading}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {definition && <p>{definition}</p>}
    </div>
  );
};

export default DictionarySearch;
