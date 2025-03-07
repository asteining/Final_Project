import './App.css';
import { Outlet } from 'react-router-dom';

import LoginPage from './components//Login/LoginPage';
import TradePage from './components/Trade/TradePage';


function App() {
  return (
    <div className="flex-column justify-flex-start min-100-vh">
      <LoginPage />
      <div className="container">
        <Outlet />
      </div>
      <TradePage />
    </div>
  );
}

export default App;
