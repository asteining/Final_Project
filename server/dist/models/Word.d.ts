import { type Document } from 'mongoose';
interface IWord extends Document {
    text: string;
}
declare const Word: import("mongoose").Model<IWord, {}, {}, {}, Document<unknown, {}, IWord> & IWord & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { type IWord, Word };
