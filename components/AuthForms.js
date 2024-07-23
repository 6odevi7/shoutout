import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isRegister ? '/api/auth/register' : '/api/auth/login';
      const { data } = await axios.post(url, formData);
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <input 
          style={{ color: 'black' }}
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username" 
          required 
        />
      )}
      <input 
        style={{ color: 'black' }}
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      <input 
        style={{ color: 'black' }}
        name="password" 
        type="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
