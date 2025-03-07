import { Schema, type Document } from 'mongoose';
interface IGame extends Document {
    wordId: Schema.Types.ObjectId;
    maskedWord: string;
    solution: string;
    guesses: string[];
    numBadGuesses: number;
    isComplete: boolean;
    isWinner: boolean;
}
declare const Game: import("mongoose").Model<IGame, {}, {}, {}, Document<unknown, {}, IGame> & IGame & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { type IGame, Game };
