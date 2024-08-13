import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BusinessmanDashboard from './pages/BusinessmanDashboard/BusinessmanDashboard';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard'; 
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  const role = localStorage.getItem('role');
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
          element={role === 'client' ? <ClientDashboard /> : <Navigate to="/login" />}
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
