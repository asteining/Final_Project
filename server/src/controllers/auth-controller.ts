// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // if you have a real User model
// If needed, import other dependencies

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // // Hard-coded test user logic for development only:
  // if (username === 'testuser' && password === 'testpass') {
  //   const token = jwt.sign({ id: 'test-user-id', username }, JWT_SECRET, {
  //     expiresIn: '1d',
  //   });
  //   res.json({ token });
  //   return;
  // }

  // Normal login logic:
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

// Optionally, you can add registration logic here as well.
