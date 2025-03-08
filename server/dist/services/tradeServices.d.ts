import { User } from '../models/User.js';
export declare const getCurrentStockPrice: (symbol: string) => number;
export declare const executeTrade: (user: typeof User.prototype, // Alternatively, if you have an interface IUser, use: user: IUser
symbol: string, shares: number, tradeType: "BUY" | "SELL") => Promise<import("mongoose").Document<unknown, {}, {
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
}> & {
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
