import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // In production, passwords should be hashed (e.g., using bcrypt)
    password: { type: String, required: true },
    cash: { type: Number, default: 100000 } // Starting virtual cash
});
export const User = model('User', userSchema);
