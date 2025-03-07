import { Trade, User } from '../models/index.js';
const cleanDB = async () => {
    try {
        await Trade.deleteMany({});
        console.log('Game collection cleaned.');
        await User.deleteMany({});
        console.log('Word collection cleaned.');
    }
    catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};
export default cleanDB;
