import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { login, register } from '../api'; // Assuming you have API for login/register

const Auth = ({ setUser }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin ? await login(form) : await register(form);
      localStorage.setItem('token', response.data.token); // Store token
      setUser(form.username);
      navigate('/home'); // Redirect to home page after login
    } catch (error) {
      console.error('Auth Error:', error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;
