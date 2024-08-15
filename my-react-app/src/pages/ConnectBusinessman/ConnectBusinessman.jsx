// ConnectBusinessman.js
import React, { useState, useEffect } from 'react';
import './ConnectBusinessman.css';
import axios from 'axios';


const ConnectBusinessman = () => {
  const [businessmen, setBusinessmen] = useState([]);
  const [selectedBusinessman, setSelectedBusinessman] = useState(null);
  const [connectionRequest, setConnectionRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinessmen = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/businessmen');
        console.log('Response data:', response.data);
        setBusinessmen(response.data);
      }
      catch(error){
        console.error('Error fetching businessmen:',error);
        setError('Failed to load businessmen. Please try again later.');
      }
      finally {
        setLoading(false);
      };
    };
    fetchBusinessmen();
    }, []);

  const handleSelectBusinessman = (businessman) => {
    setSelectedBusinessman(businessman);
  };

  const handleConnect = async () => {
    if (!selectedBusinessman) {
      alert('Please select a businessman to connect with');
      return;
    }

    setConnectionRequest(true);

    axios.post('http://localhost:5000/api/connect', {
      clientId: localStorage.getItem('clientId'),
      businessmanId: selectedBusinessman.uuid,
    })
      .then(response => {
        setConnectionRequest(false);
        alert('Connection request sent successfully!');
      })
      .catch(error => {
        setConnectionRequest(false);
        console.error(error);
      });
  };

  console.log('Businessmen:', businessmen);
  if (loading) {
      return <div className="loading">Loading businessmen...</div>;
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
  

  return (
    <div className="connect-businessman-container">
      <h2>Connect with a Businessman</h2>
      <ul>
        {businessmen.map((businessman) => (
          <li key={businessman.uuid}>
            <span>{businessman.name}</span>
            <button onClick={() => handleSelectBusinessman(businessman)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedBusinessman && (
        <div>
          <h3>Selected Businessman: {selectedBusinessman.name}</h3>
          <button onClick={handleConnect}>Connect</button>
          {connectionRequest && <p>Sending connection request...</p>}
        </div>
      )}
    </div>
  );
};

export default ConnectBusinessman;