import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    <header>
      <h1>TradeSmart</h1>
      <div className="login">
        {token ? (
          <span>Welcome</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
