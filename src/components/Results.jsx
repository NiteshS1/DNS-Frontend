import React from 'react';

function Results({ domain, records }) {
  const RecordSection = ({ title, records, renderItem }) => (
    <div className="record-section">
      <h3>{title}</h3>
      <ul className="record-list">
        {records && records.length > 0 ? (
          records.map((record, index) => (
            <li key={index}>{renderItem(record)}</li>
          ))
        ) : (
          <li>No records found</li>
        )}
      </ul>
    </div>
  );

  const SoaInfo = ({ soa }) => {
    if (!soa) return <div>No SOA record found</div>;

    return (
      <div className="soa-info">
        Primary Nameserver: {soa.nsname}
        Hostmaster: {soa.hostmaster}
        Serial: {soa.serial}
        Refresh: {soa.refresh} seconds
        Retry: {soa.retry} seconds
        Expire: {soa.expire} seconds
        Minimum TTL: {soa.minttl} seconds
      </div>
    );
  };

  return (
    <div className="result-container">
      <h2>Results for <span>{domain}</span></h2>

      <RecordSection
        title="IPv4 Addresses (A Records)"
        records={records.a}
        renderItem={(ip) => ip}
      />

      <RecordSection
        title="IPv6 Addresses (AAAA Records)"
        records={records.aaaa}
        renderItem={(ip) => ip}
      />

      <RecordSection
        title="Mail Servers (MX Records)"
        records={records.mx}
        renderItem={(mx) => `${mx.exchange} (Priority: ${mx.priority})`}
      />

      <RecordSection
        title="Text Records (TXT)"
        records={records.txt}
        renderItem={(txt) => txt}
      />

      <RecordSection
        title="Name Servers (NS Records)"
        records={records.ns}
        renderItem={(ns) => ns}
      />

      <RecordSection
        title="Canonical Names (CNAME)"
        records={records.cname}
        renderItem={(cname) => cname}
      />

      <div className="record-section">
        <h3>Start of Authority (SOA)</h3>
        <SoaInfo soa={records.soa} />
      </div>
    </div>
  );
}

export default Results; 