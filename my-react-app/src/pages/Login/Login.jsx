import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const token = response.data.token;
      const role = response.data.role;

      // Storing token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Login Successful!');

      if(role == 'businessman'){
        navigate('/businessmandashboard');
      }else if(role == 'client'){
        navigate('/clientdashboard');
      }else{
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occured');
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
        <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
        <div className="submit-container">
          <button type="submit" className='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;