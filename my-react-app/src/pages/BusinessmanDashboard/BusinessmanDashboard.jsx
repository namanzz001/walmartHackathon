import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BusinessmanDashboard.css';

const BusinessmanDashboard = () => {
  const [sales, setSales] = useState(null);
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:5000/api/sales', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSales(salesResponse.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const fetchInventoryData = async () => {
      try {
        const inventoryResponse = await axios.get('http://localhost:5000/api/inventory', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInventory(inventoryResponse.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchSalesData();
    fetchInventoryData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Businessman Dashboard</h1>
      <div className="section">
        <h2>Sales</h2>
        {sales ? (
          <>
            <div>
              <h3>Weekly Sales</h3>
              <p>${sales.weekly}</p>
            </div>
            <div>
              <h3>Monthly Sales</h3>
              <p>${sales.monthly}</p>
            </div>
            <div>
              <h3>Yearly Sales</h3>
              <p>${sales.yearly}</p>
            </div>
            <div>
              <h3>Sales by Category</h3>
              <ul>
                {Object.entries(sales.categories).map(([category, amount]) => (
                  <li key={category}>{category}: ${amount}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading sales data...</p>
        )}
      </div>

      <div className="section">
        <h2>Inventory</h2>
        {inventory ? (
          <ul>
            {Object.entries(inventory).map(([item, count]) => (
              <li key={item}>{item}: {count} left in stock</li>
            ))}
          </ul>
        ) : (
          <p>Loading inventory data...</p>
        )}
      </div>
      <Link to="/ClientDashboard" >Go to Client Dashboard</Link>
    </div>
  );
};

export default BusinessmanDashboard;
