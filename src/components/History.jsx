import React from 'react';

function History({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return 'Unknown date';
    }
  };

  const getFirstIP = (records) => {
    if (!records) return 'No records';
    if (records.a && records.a.length > 0) return records.a[0];
    if (records.aaaa && records.aaaa.length > 0) return records.aaaa[0];
    return 'No IP found';
  };

  return (
    <div className="history-container">
      <h2>Recent Lookups</h2>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <div className="history-domain">{item.domain}</div>
            <div className="history-ip">{getFirstIP(item.records)}</div>
            <div className="history-timestamp">{formatDate(item.timestamp)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History; 