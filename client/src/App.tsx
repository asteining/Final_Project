import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <footer>
        <p>&copy; {new Date().getFullYear()} TradeSmart</p>
      </footer>
    </>
  );
};

export default App;
