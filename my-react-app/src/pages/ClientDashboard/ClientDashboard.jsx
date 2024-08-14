import { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertsResponse = await axios.get('/api/alerts');
        const expensesResponse = await axios.get('/api/expenses');

        console.log('Alerts Data:', alertsResponse.data); // Debug log to check data
        console.log('Expenses Data:', expensesResponse.data); // Debug log to check data

        setAlerts(Array.isArray(alertsResponse.data) ? alertsResponse.data : []); // Ensure it's an array
        setExpenses(expensesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!expenses) {
    return <div>No data available.</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Client Dashboard</h1>
      <div className="section">
        <h2><center>Alerts & Notifications</center></h2>
        <ul>
          {alerts.length > 0 ? alerts.map((alert, index) => (
            <li key={index}>{alert.message}</li>
          )) : <li>No alerts available.</li>}
        </ul>
      </div>

      <div className="section">
        <h2>Expenses</h2>
        {expenses ? (
          <>
            <p>Weekly: {expenses.weekly}</p>
            <p>Monthly: {expenses.monthly}</p>
            <p>Yearly: {expenses.yearly}</p>
            <div>
              <h3>Purchases:</h3>
              <ul>
                {expenses.purchases && expenses.purchases.map((purchase, index) => (
                  <li key={index}>{purchase.shop}: {purchase.amount}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No expenses data available.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
