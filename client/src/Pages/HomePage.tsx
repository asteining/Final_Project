import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('/api/trade/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default HomePage;
