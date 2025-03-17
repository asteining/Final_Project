import db from '../config/connection.js';
import { User, Trade } from '../models/index.js';
import cleanDB from './cleanDB.js';

// Import the JSON data. (Using assert syntax for ESM.)
import userData from './userSeeds.json' with { type: 'json' };
import tradeData from './tradeSeeds.json' with { type: 'json' };

try {
  await db();
  await cleanDB();

  // Seed the User collection
  const seededUsers = await User.insertMany(userData);
  console.log('User seeding completed successfully!');

  // For the Trade collection, assign a valid userId (e.g., the first seeded user)
  const userId = seededUsers[0]._id;
  const updatedTradeData = tradeData.map((trade: any) => ({
    ...trade,
    userId
  }));

  await Trade.insertMany(updatedTradeData);
  console.log('Trade seeding completed successfully!');

  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
