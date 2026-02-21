import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [detailsMap, setDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleDetail = (value) => {
    // toggle only when previous fetched value exists
    if (detailsMap[value] !== undefined) {
      setDetailsMap((prev) => ({ ...prev, [value]: null }));
      return;
    }
    // fetch
    fetch(`/api/details?value=${encodeURIComponent(value)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((detailRes) => {
        setDetailsMap((prev) => ({ ...prev, [value]: detailRes.detail }));
      })
      .catch(() => {
        setDetailsMap((prev) => ({ ...prev, [value]: 'Error fetching details' }));
      });
  };

  // Replace fetchDetail with toggleDetail logic
  const showDetail = (value) => {
    const current = detailsMap[value];
    if (current) {
      // Already loaded, just toggle off
      setDetailsMap((prev) => ({ ...prev, [value]: null }));
      return;
    }
    // Not loaded yet, fetch it
    fetch(`/api/details?value=${encodeURIComponent(value)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((detailRes) => {
        setDetailsMap((prev) => ({ ...prev, [value]: detailRes.detail }));
      })
      .catch(() => {
        setDetailsMap((prev) => ({ ...prev, [value]: 'Error fetching details' }));
      });
  };

  if (loading) return <div className="App"><p>Loading...</p></div>;
  if (error) return <div className="App"><p style={{color: 'red'}}>{error}</p></div>;

  return (
    <div className="App">
      <h1>Data Sheet</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Value</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>{detailsMap[item] || 'N/A'}</td>
              <td>
    <td>
                <button onClick={() => toggleDetail(item)}>
                  {detailsMap[item] ? 'Hide Detail' : 'Show Detail'}
                </button>
              </td>
  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

