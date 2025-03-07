import { Schema } from 'mongoose';
export declare const User: import("mongoose").Model<{
    username: string;
    password: string;
    cash: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    username: string;
    password: string;
    cash: number;
}> & {
    username: string;
    password: string;
    cash: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    username: string;
    password: string;
    cash: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    username: string;
    password: string;
    cash: number;
}>> & import("mongoose").FlatRecord<{
    username: string;
    password: string;
    cash: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
