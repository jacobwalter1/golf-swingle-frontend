import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, GAME_MODES, MODE_CONFIG } from "../utils/constants";
import { getTodayDate } from "../utils/helpers";
import { getCurrentVideoLevel } from "../services/gameLogic";
import { submitGuess as submitGuessAPI } from "../services/api";
import { updateUserStats } from "../services/storage";
import { compareGolfers } from "../utils/comparison";

/**
 * Hook to manage game state
 */
export function useGameState(userId, puzzle, answerGolfer) {
	const [gameMode, setGameMode] = useLocalStorage(STORAGE_KEYS.GAME_MODE, GAME_MODES.NORMAL);
	const [currentGame, setCurrentGame] = useLocalStorage(STORAGE_KEYS.CURRENT_GAME, null);

	const [guesses, setGuesses] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [won, setWon] = useState(false);
	const [currentLevel, setCurrentLevel] = useState(1);
	const [submitting, setSubmitting] = useState(false);

	const modeConfig = MODE_CONFIG[gameMode];
	const maxGuesses = modeConfig?.maxGuesses || 6;

	// Load game state from storage
	useEffect(() => {
		if (!puzzle || !currentGame) return;

		const today = getTodayDate();

		// Check if saved game is for today
		if (currentGame.date === today && currentGame.puzzleGolferId === puzzle.golferId) {
			setGuesses(currentGame.guesses || []);
			setGameOver(currentGame.gameOver || false);
			setWon(currentGame.won || false);

			// Set current level based on guesses
			const level = getCurrentVideoLevel(gameMode, currentGame.guesses?.length || 0);
			setCurrentLevel(level);
		} else {
			// New day, reset game
			setCurrentGame(null);
			setGuesses([]);
			setGameOver(false);
			setWon(false);
			setCurrentLevel(1);
		}
	}, [puzzle, currentGame, gameMode, setCurrentGame]);

	// Submit a guess
	const submitGuess = useCallback(
		async (guessGolfer) => {
			if (!puzzle || !answerGolfer || gameOver || submitting) return;

			setSubmitting(true);

			try {
				// Create the guess object with comparison
				const comparison = compareGolfers(guessGolfer, answerGolfer);

				const guessObject = {
					golfer: guessGolfer,
					comparison,
				};

				const newGuesses = [...guesses, guessObject];
				const guessNumber = newGuesses.length;

				// Get array of just the golfer IDs for backend
				const guessedGolferIds = newGuesses.map((g) => g.golfer.playerId);

				// Submit to backend
				const guessResult = await submitGuessAPI(userId, guessGolfer.playerId, guessNumber, guessedGolferIds);

				// Update local state
				setGuesses(newGuesses);

				// Update video level
				const newLevel = getCurrentVideoLevel(gameMode, guessNumber);
				setCurrentLevel(newLevel);

				setGameOver(guessResult.gameOver);
				setWon(guessResult.isCorrect);

				// Save game state
				const gameState = {
					date: puzzle.date,
					puzzleGolferId: puzzle.golferId,
					guesses: newGuesses,
					gameOver: guessResult.gameOver,
					won: guessResult.isCorrect,
					mode: gameMode,
				};
				setCurrentGame(gameState);

				// Update stats if game is over
				if (guessResult.gameOver) {
					updateUserStats(guessResult.isCorrect, guessNumber);
				}
			} catch (error) {
				console.error("Error submitting guess:", error);
			} finally {
				setSubmitting(false);
			}
		},
		[puzzle, answerGolfer, guesses, gameOver, gameMode, maxGuesses, userId, setCurrentGame, submitting]
	);

	// Change game mode
	const changeMode = useCallback(
		(newMode) => {
			setGameMode(newMode);

			// Update current level based on new mode
			const level = getCurrentVideoLevel(newMode, guesses.length);
			setCurrentLevel(level);

			// Update saved game with new mode
			if (currentGame) {
				setCurrentGame({
					...currentGame,
					mode: newMode,
				});
			}
		},
		[guesses.length, currentGame, setGameMode, setCurrentGame]
	);

	return {
		guesses,
		gameOver,
		won,
		currentLevel,
		gameMode,
		maxGuesses,
		submitting,
		submitGuess,
		changeMode,
	};
}
