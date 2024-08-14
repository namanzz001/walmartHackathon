import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BusinessmanDashboard from './pages/BusinessmanDashboard/BusinessmanDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard'; 
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem('role'));
    };

    // Add event listener to detect changes to localStorage (cross-tab functionality)
    window.addEventListener('storage', handleRoleChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleRoleChange);
    };
  }, []);

  console.log('Current Role:', role); // Debug log to check role

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/businessmandashboard"
          element={role === 'businessman' ? <BusinessmanDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/clientdashboard"
          element={role === 'client' ? < ClientDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={
            role === 'businessman'
              ? <Navigate to="/businessmandashboard" />
              : role === 'client'
              ? <Navigate to="/clientdashboard" />
              : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
