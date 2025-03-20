// Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page
  };

  return (
    <header>
      <div className="header-left">
        <Link to="/" className="logo">
          TradeSmart
        </Link>
      </div>
      <div className="header-right">
        {token ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
