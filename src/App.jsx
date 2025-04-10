import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/SearchBox.jsx';
import Results from './components/Results.jsx';
import History from './components/History.jsx';

function App() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('dnsLookupHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const performLookup = async (domain) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lookup?domain=${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'DNS lookup failed');
      }

      const data = await response.json();
      
      if (!data || !data.records) {
        throw new Error('Invalid response format from server');
      }
      
      setResults(data);
      
      // Update history
      const newHistory = [
        { domain, timestamp: new Date().toISOString(), records: data.records },
        ...history.slice(0, 9)
      ];
      setHistory(newHistory);
      localStorage.setItem('dnsLookupHistory', JSON.stringify(newHistory));
      
    } catch (error) {
      console.error('Lookup error:', error);
      setError(error.message || 'An error occurred during DNS lookup');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>DNS Lookup Tool</h1>
      
      <SearchBox 
        onSearch={performLookup}
        loading={loading}
      />
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Looking up domain...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {results && (
        <Results 
          domain={results.domain}
          records={results.records}
        />
      )}
      
      <History history={history} />
    </div>
  );
}

export default App; 