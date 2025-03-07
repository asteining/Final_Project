import type { Response } from 'express';
import type { IGame } from '../models/Game.js';
declare const maskLettersInWord: (word: string) => string;
declare const guessLetter: (letter: string, game: IGame) => {
    game: IGame;
    isCorrect: boolean;
};
declare const saveAndReturnGame: (game: IGame, isCorrect: boolean, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const handleWin: (game: IGame, res: Response) => Promise<void>;
export { maskLettersInWord, guessLetter, saveAndReturnGame, handleWin };
