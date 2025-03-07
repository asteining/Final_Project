import { Trade } from '../models/Trade';
import { User } from '../models/User';

export const getCurrentStockPrice = (symbol: string): number => {
  // Replace with a real API call if desired.
  console.log(`Fetching current stock price for symbol: ${symbol}`);
  return Math.floor(Math.random() * 401) + 100; // Price between 100 and 500
};

export const executeTrade = async (
  user: typeof User.prototype, // Alternatively, if you have an interface IUser, use: user: IUser
  symbol: string,
  shares: number,
  tradeType: 'BUY' | 'SELL'
) => {
  const price = getCurrentStockPrice(symbol);
  const total = price * shares;

  if (tradeType === 'BUY') {
    if (user.cash < total) {
      throw new Error('Insufficient funds');
    }
    user.cash -= total;
  } else if (tradeType === 'SELL') {
    // For simplicity, we don’t check if the user holds shares.
    user.cash += total;
  }

  await user.save();

  const trade = new Trade({
    userId: user._id,
    symbol,
    shares,
    price,
    tradeType,
  });
  await trade.save();
  return trade;
};
