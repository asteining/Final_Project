import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Trade } from '../models/Trade.js';
import { executeTrade } from '../services/tradeServices.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password, cash: 100000 });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
};
const getPortfolio = async (req, res) => {
    // Assume authMiddleware attaches the decoded user info to req.user
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        const trades = await Trade.find({ userId });
        res.json({ user, trades });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
};
const buyStock = async (req, res) => {
    const userId = req.user.id;
    const { symbol, shares } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const trade = await executeTrade(user, symbol, Number(shares), 'BUY');
        res.json(trade);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
};
const sellStock = async (req, res) => {
    const userId = req.user.id;
    const { symbol, shares } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const trade = await executeTrade(user, symbol, Number(shares), 'SELL');
        res.json(trade);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
};
export { register, login, getPortfolio, buyStock, sellStock };
