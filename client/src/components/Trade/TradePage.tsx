import { useState, useEffect } from 'react';

// Define types for user and trade objects
interface User {
  username: string;
  cash: number;
}

interface Trade {
  _id: string;
  tradeType: 'BUY' | 'SELL';
  shares: number;
  symbol: string;
  price: number;
  date: string;
}

function TradePage() {
  // Initialize state with proper types
  const [user, setUser] = useState<User | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');

  const token = localStorage.getItem('token');

  // Fetch the user's portfolio on component mount
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

  // Handle the trade submission (buy or sell)
  const handleTrade = async () => {
    if (!token) return alert('Please log in.');
    const endpoint = tradeType === 'BUY' ? '/api/trade/buy' : '/api/trade/sell';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
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

  return (
    <div className="trade-page">
      <h1>TradeSmart Simulator</h1>
      {user ? (
        <>
          <h2>Welcome, {user.username}</h2>
          <h3>Cash Balance: ${user.cash.toLocaleString()}</h3>
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
        </>
      ) : (
        <p>Please log in to trade.</p>
      )}
    </div>
  );
}

export default TradePage;
