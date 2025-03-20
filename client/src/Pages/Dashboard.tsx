// pages/TradeDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Registers Chart.js components automatically

interface User {
  username: string;
  cash: number;
  initialInvestment?: number;
}

interface Trade {
  _id: string;
  tradeType: 'BUY' | 'SELL';
  shares: number;
  symbol: string;
  price: number;
  date: string;
}

// Simple function to calculate balance history from trades
const calculateBalanceHistory = (initialCash: number, trades: Trade[]) => {
  const history: { date: string; balance: number }[] = [];
  let currentBalance = initialCash;
  // Assuming trades are sorted by date ascending
  trades.forEach((trade) => {
    const cost = trade.price * trade.shares;
    currentBalance = trade.tradeType === 'BUY' ? currentBalance - cost : currentBalance + cost;
    history.push({ date: trade.date, balance: currentBalance });
  });
  return history;
};

const TradeDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [showHistory, setShowHistory] = useState(false);

  const token = localStorage.getItem('token');

  // Simulated current stock prices
  const currentPrices: Record<string, number> = {
    AAPL: 150,
    TSLA: 250,
    // Add more symbols as needed…
  };

  useEffect(() => {
    if (!token) return;
    fetch('/api/trade/portfolio', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setTrades(data.trades);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleTrade = async () => {
    if (!token) return alert('Please log in.');
    const endpoint = tradeType === 'BUY' ? '/api/trade/buy' : '/api/trade/sell';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ symbol, shares: Number(shares) }),
    });
    const trade: Trade = await res.json();
    setTrades([...trades, trade]);

    // Refresh portfolio info after the trade
    const portfolioRes = await fetch('/api/trade/portfolio', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const portfolioData = await portfolioRes.json();
    setUser(portfolioData.user);
  };

  // Aggregate positions by symbol (net shares held)
  const positions = trades.reduce((acc, trade) => {
    const current = acc[trade.symbol] || 0;
    const sharesChange = trade.tradeType === 'BUY' ? trade.shares : -trade.shares;
    return { ...acc, [trade.symbol]: current + sharesChange };
  }, {} as Record<string, number>);

  // Calculate net investment results:
  // Use the user's initialInvestment if set; otherwise, default to $100,000.
  const initialInvestment = user ? user.initialInvestment ?? 100000 : 100000;
  // Calculate current positions value based on simulated current prices.
  let positionsValue = 0;
  for (const sym in positions) {
    positionsValue += positions[sym] * (currentPrices[sym] || 0);
  }
  // The current portfolio value is cash plus the current market value of positions.
  const currentPortfolioValue = user ? user.cash + positionsValue : 0;
  const netInvestmentResults = currentPortfolioValue - initialInvestment;

  // Calculate balance history (this uses the trade prices at the time of trade)
  const balanceHistory = user ? calculateBalanceHistory(initialInvestment, trades) : [];
  const chartData = {
    labels: balanceHistory.map((h) => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Account Balance',
        data: balanceHistory.map((h) => h.balance),
        fill: false,
        borderColor: '#1bbc9b',
      },
    ],
  };

  return (
    <div className="trade-dashboard container">
      <h1>TradeSmart Simulator</h1>
      {user ? (
        <>
          <h2>Welcome, {user.username}</h2>
          <h3>Cash Balance: ${user.cash.toLocaleString()}</h3>
          <h3>
            Net Investment Results:{' '}
            <span style={{ color: netInvestmentResults >= 0 ? 'green' : 'red' }}>
              ${netInvestmentResults.toLocaleString()}
            </span>
          </h3>
          <div className="trade-form">
            <h3>Make a Trade</h3>
            <label>
              Trade Type:
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value as 'BUY' | 'SELL')}
              >
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
              </select>
            </label>
            <label>
              Stock Symbol:
              <input
                type="text"
                placeholder="e.g., AAPL"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </label>
            <label>
              Shares:
              <input
                type="number"
                placeholder="Shares"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
              />
            </label>
            <button onClick={handleTrade}>Submit Trade</button>
          </div>
          <button onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Hide Notifications' : 'Show Notifications'}
          </button>
          {showHistory && (
            <div className="trade-history">
              <h3>Trade History</h3>
              <ul>
                {trades.map((trade) => (
                  <li key={trade._id}>
                    {trade.tradeType} {trade.shares} shares of {trade.symbol} at ${trade.price} on{' '}
                    {new Date(trade.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="balance-chart">
            <h3>Account Balance Over Time</h3>
            {balanceHistory.length > 0 ? <Line data={chartData} /> : <p>No trading activity yet.</p>}
          </div>
          <div className="positions">
            <h3>Current Stock Positions</h3>
            <ul>
              {Object.entries(positions).map(([sym, qty]) => (
                <li key={sym}>
                  {sym}: {qty} shares
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Please log in to trade.</p>
      )}
    </div>
  );
};

export default TradeDashboard;
