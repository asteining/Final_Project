import { Trade, User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await Trade.deleteMany({});
    console.log('Trade collection cleaned.');

    await User.deleteMany({});
    console.log('User collection cleaned.');
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
