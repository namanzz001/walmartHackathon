import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
  
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
  
    try {
      // Clear localStorage to prevent role mismatch
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const token = response.data.token;
      const role = response.data.role;
  
      // Log the returned role for debugging
      console.log('Returned Role from Server:', role);
  
      // Set the correct token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      // Force a re-render in App.jsx by triggering a state update
      window.dispatchEvent(new Event('storage')); // This triggers the storage event for the other components to pick up the change
  
      alert('Login Successful!');
  
      // Redirect based on the actual role of the logged-in user
      if (role === 'businessman') {
        navigate('/businessmandashboard');
      } else if (role === 'client') {
        navigate('/clientdashboard');
      } else {
        setError('Invalid role detected. Please try again.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="login-container">
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit} className='inputs'>
        <div className="input">
          <input
            type="email"
            placeholder='Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (<div className='error'>{error}</div>)}
        <div className="submit-container">
          <button type="submit" className='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div className='signup'>
        <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;