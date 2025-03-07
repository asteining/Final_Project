import { Word } from '../models/Word.js';
import { Game } from '../models/Game.js';
import { maskLettersInWord, guessLetter, saveAndReturnGame, handleWin } from '../services/gameServices.js';
export const getInitialGameState = async (_req, res) => {
    try {
        const words = await Word.aggregate([
            { $sample: { size: 1 } },
            { $project: { text: 1 } },
        ]);
        if (words && words.length > 0) {
            const word = words[0];
            console.log(`The word to guess is: '${word.text}'.`);
            const maskedWord = maskLettersInWord(word.text);
            // Create a new Game document
            const newGame = new Game({
                wordId: word._id,
                maskedWord: maskedWord,
                solution: word.text,
                guesses: [],
                badGuesses: 0,
            });
            await saveAndReturnGame(newGame, false, res);
        }
        else {
            res.status(404).json({ message: 'Word not found.' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const addGuess = async (req, res) => {
    const { id } = req.params;
    const { letter } = req.body;
    try {
        // Find the Game document
        const savedGame = await Game.findById(id);
        if (!savedGame) {
            return res.status(404).json({ message: 'Game not found.' });
        }
        const { game: gameUpdate, isCorrect } = await guessLetter(letter, savedGame);
        if (gameUpdate.isComplete && gameUpdate.maskedWord.includes('_')) {
            console.log('gameLoser', gameUpdate.isComplete);
            return await saveAndReturnGame(gameUpdate, isCorrect, res);
        }
        if (gameUpdate.maskedWord === gameUpdate.solution) {
            return await handleWin(gameUpdate, res);
        }
        return await saveAndReturnGame(gameUpdate, isCorrect, res);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
