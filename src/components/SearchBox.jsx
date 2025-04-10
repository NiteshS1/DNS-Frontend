import React, { useState } from 'react';

function SearchBox({ onSearch, loading }) {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim() && !loading) {
      onSearch(domain.trim());
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain name (e.g., google.com)"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        Lookup
      </button>
    </form>
  );
}

export default SearchBox; 