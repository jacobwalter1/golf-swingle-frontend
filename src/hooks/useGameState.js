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
export function useGameState(userId, puzzle, answerGolfer, isUnlimitedMode = false) {
	const storageKey = isUnlimitedMode ? STORAGE_KEYS.UNLIMITED_GAME : STORAGE_KEYS.CURRENT_GAME;
	const [gameMode, setGameMode] = useLocalStorage(STORAGE_KEYS.GAME_MODE, GAME_MODES.NORMAL);
	const [currentGame, setCurrentGame] = useLocalStorage(storageKey, null);

	const [guesses, setGuesses] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [won, setWon] = useState(false);
	const [currentLevel, setCurrentLevel] = useState(1);
	const [submitting, setSubmitting] = useState(false);

	const modeConfig = MODE_CONFIG[gameMode];
	const maxGuesses = modeConfig?.maxGuesses || 6;

	// Reload saved game when mode changes
	useEffect(() => {
		// Manually reload from localStorage when storage key changes
		try {
			const savedGame = localStorage.getItem(storageKey);
			if (savedGame) {
				const parsedGame = JSON.parse(savedGame);
				setCurrentGame(parsedGame);
			} else {
				setCurrentGame(null);
			}
		} catch (error) {
			console.error("Error loading saved game:", error);
			setCurrentGame(null);
		}
	}, [storageKey, setCurrentGame]);

	// Load game state from storage
	useEffect(() => {
		if (!puzzle) {
			// No puzzle, reset state
			setGuesses([]);
			setGameOver(false);
			setWon(false);
			setCurrentLevel(1);
			return;
		}

		// If no saved game, start fresh
		if (!currentGame) {
			setGuesses([]);
			setGameOver(false);
			setWon(false);
			setCurrentLevel(1);
			return;
		}

		// Check if saved game matches current puzzle
		if (currentGame.puzzleGolferId === puzzle.golferId && currentGame.date === puzzle.date) {
			// Load saved game state
			setGuesses(currentGame.guesses || []);
			setGameOver(currentGame.gameOver || false);
			setWon(currentGame.won || false);

			// Set current level based on guesses
			const level = getCurrentVideoLevel(gameMode, currentGame.guesses?.length || 0);
			setCurrentLevel(level);
		} else {
			// Different puzzle, reset game
			setCurrentGame(null);
			setGuesses([]);
			setGameOver(false);
			setWon(false);
			setCurrentLevel(1);
		}
	}, [puzzle?.golferId, puzzle?.date, currentGame, gameMode, setCurrentGame]);

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

				// Check if the guess is correct
				const isCorrect = guessGolfer.playerId === answerGolfer.playerId;

				// Check if game is over (correct guess or max guesses reached)
				const isGameOver = isCorrect || guessNumber >= maxGuesses;

				// Update local state
				setGuesses(newGuesses);

				// Update video level
				const newLevel = getCurrentVideoLevel(gameMode, guessNumber);
				setCurrentLevel(newLevel);

				setGameOver(isGameOver);
				setWon(isCorrect);

				// Save game state
				const gameState = {
					date: puzzle.date,
					puzzleGolferId: puzzle.golferId,
					guesses: newGuesses,
					gameOver: isGameOver,
					won: isCorrect,
					mode: gameMode,
				};
				setCurrentGame(gameState);

				// If game is over, submit to backend and update stats (only for daily mode, not unlimited)
				if (isGameOver && !isUnlimitedMode) {
					try {
						// Get array of just the golfer IDs for backend
						const guessedGolferIds = newGuesses.map((g) => g.golfer.playerId);

						// Submit to backend
						await submitGuessAPI(userId, guessGolfer.playerId, guessNumber, guessedGolferIds);

						// Update stats
						updateUserStats(isCorrect, guessNumber);
					} catch (apiError) {
						console.error("Error saving game to backend:", apiError);
						// Continue even if backend fails - local state is already updated
					}
				}
			} catch (error) {
				console.error("Error submitting guess:", error);
			} finally {
				setSubmitting(false);
			}
		},
		[puzzle, answerGolfer, guesses, gameOver, gameMode, maxGuesses, userId, setCurrentGame, submitting, isUnlimitedMode]
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
