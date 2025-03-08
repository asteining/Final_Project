import { Schema } from 'mongoose';
export declare const Trade: import("mongoose").Model<{
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
}>> & import("mongoose").FlatRecord<{
    symbol: string;
    date: NativeDate;
    userId: import("mongoose").Types.ObjectId;
    shares: number;
    price: number;
    tradeType: "BUY" | "SELL";
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
