import { Schema, model } from 'mongoose';
const tradeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, required: true },
    price: { type: Number, required: true },
    tradeType: { type: String, enum: ['BUY', 'SELL'], required: true },
    date: { type: Date, default: Date.now },
});
export const Trade = model('Trade', tradeSchema);
