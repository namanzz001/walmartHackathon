import { useState } from 'react';
import axios from 'axios';
import '../Signup/Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client'); // New state for role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!firstName || !lastName || !email || !phoneNumber || !password || password !== confirmPassword) {
      setError('Please fill in all fields correctly');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { // Ensure this is correct
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
      });
      alert(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="form">
      <div className='header'>
        <div className='text'>Signup</div>
        <div className='underline'></div>
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form__label" htmlFor="firstName">First Name </label>
          <input 
            className="form__input" 
            type="text" 
            id="firstName" 
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="lastName">Last Name </label>
          <input 
            type="text" 
            id="lastName" 
            className="form__input" 
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="email">Email </label>
          <input 
            type="email" 
            id="email" 
            className="form__input" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="phoneNumber">Phone Number </label>
          <input 
            type="tel" 
            id="phoneNumber" 
            className="form__input" 
            placeholder="Phone Number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            pattern="[0-9]{10}" 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="password">Password </label>
          <input 
            className="form__input" 
            type="password" 
            id="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
          <input 
            className="form__input" 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="role">Role </label>
          <select 
            className="form__input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="businessman">Businessman</option>
          </select>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="footer">
        <button type="submit" className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      <div className='login'><Link to="/login">Already have an account? Login</Link></div>
    </div>
  );
};

export default Signup;
