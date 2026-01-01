import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";
import { GolferAutocomplete } from "./components/GolferAutocomplete";
import { GuessHistory } from "./components/GuessHistory";
import { StatsModal } from "./components/StatsModal";
import { GameOverModal } from "./components/GameOverModal";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { useAuth } from "./hooks/useAuth";
import { useDailyPuzzle } from "./hooks/useDailyPuzzle";
import { useUnlimitedPuzzle } from "./hooks/useUnlimitedPuzzle";
import { useGolfers } from "./hooks/useGolfers";
import { useGameState } from "./hooks/useGameState";
import { GAME_MODES, MODE_CONFIG } from "./utils/constants";

function App() {
	const [showStats, setShowStats] = useState(false);
	const [showGameOver, setShowGameOver] = useState(false);
	const [isUnlimitedMode, setIsUnlimitedMode] = useState(false);

	// Hooks
	const userId = useAuth();
	const { puzzle: dailyPuzzle, loading: puzzleLoading, error: puzzleError } = useDailyPuzzle();
	const { golfers, loading: golfersLoading, error: golfersError } = useGolfers();

	// Unlimited mode hook
	const { puzzle: unlimitedPuzzle, loading: unlimitedLoading, loadNewPuzzle, usedCount } = useUnlimitedPuzzle();

	// Use the appropriate puzzle based on mode
	const puzzle = isUnlimitedMode ? unlimitedPuzzle : dailyPuzzle;

	// Find the answer golfer
	const answerGolfer = useMemo(() => {
		if (!puzzle || !golfers.length) return null;
		return golfers.find((g) => g.id === puzzle.id);
	}, [puzzle, golfers]);

	// Game state with unlimited mode flag
	const { guesses, gameOver, won, currentLevel, gameMode, maxGuesses, submitting, submitGuess, changeMode } = useGameState(
		userId,
		puzzle,
		answerGolfer,
		isUnlimitedMode
	);

	// Track if daily puzzle is complete
	const [dailyPuzzleComplete, setDailyPuzzleComplete] = useState(false);

	// Check if daily puzzle is complete
	useEffect(() => {
		if (!isUnlimitedMode && gameOver) {
			setDailyPuzzleComplete(true);
		}
	}, [gameOver, isUnlimitedMode]);

	// Handle switching to unlimited mode
	const handlePlayUnlimited = async () => {
		setIsUnlimitedMode(true);
		setShowGameOver(false);
		await loadNewPuzzle();
	};

	// Handle switching back to daily mode
	const handleBackToDaily = () => {
		setIsUnlimitedMode(false);
	};

	// Handle next puzzle in unlimited mode
	const handleNextPuzzle = async () => {
		await loadNewPuzzle();
	};

	// Show game over modal when game ends
	useEffect(() => {
		setShowGameOver(gameOver);
	}, [gameOver]);

	// Loading state
	if (puzzleLoading || golfersLoading || !userId) {
		return (
			<div className="app">
				<LoadingSpinner />
			</div>
		);
	}

	// Error state
	if (puzzleError || golfersError) {
		return (
			<div className="app">
				<Header onShowStats={() => setShowStats(true)} gameMode={GAME_MODES.NORMAL} onChangeMode={() => {}} />
				<ErrorMessage message={puzzleError || golfersError} />
				<StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
			</div>
		);
	}

	// No puzzle or golfers - only show error if we're done loading and still don't have data
	if (!puzzle || !answerGolfer) {
		// Still show loading if we're waiting for data to arrive
		if (!puzzle && !puzzleError) {
			return (
				<div className="app">
					<LoadingSpinner />
				</div>
			);
		}
		if (!answerGolfer && golfers.length === 0 && !golfersError) {
			return (
				<div className="app">
					<LoadingSpinner />
				</div>
			);
		}
		// These are required otherwise it will error out
		// Have no idea why but my best guess is that it has something to do with React's rendering cycle
		console.error("Missing puzzle or answer golfer data");
		console.log({ puzzle, answerGolfer });
		// Only show error if we have actual missing data
		return (
			<div className="app">
				<Header onShowStats={() => setShowStats(true)} gameMode={GAME_MODES.NORMAL} onChangeMode={() => {}} />
				<ErrorMessage message="Unable to load today's puzzle" />
				<StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
			</div>
		);
	}

	const modeConfig = MODE_CONFIG[gameMode];

	return (
		<div className="app">
			<Header
				onShowStats={() => setShowStats(true)}
				gameMode={gameMode}
				onChangeMode={changeMode}
				dailyPuzzleComplete={dailyPuzzleComplete}
				isUnlimitedMode={isUnlimitedMode}
				onPlayUnlimited={handlePlayUnlimited}
				onBackToDaily={handleBackToDaily}
			/>

			<main className="main-content">
				{/* Mode Indicator */}
				{/* TODO Maybe Delete this cant tell if it looks good or not */}
				{isUnlimitedMode && (
					<div className="unlimited-mode-banner">Unlimited Mode - Practice with Past Puzzles (Played: {usedCount})</div>
				)}

				{/* Video Player */}
				<div className="video-section">
					<VideoPlayer golferPlayerId={answerGolfer.playerId} level={currentLevel} gameOver={gameOver} />
				</div>

				{/* Game Info */}
				<div className="game-info">
					<div className="mode-indicator">
						<span className="mode-label">Mode: </span>
						<span className="mode-value">{modeConfig.label}</span>
						<span className="mode-description">({modeConfig.description})</span>
					</div>
					<div className="guess-counter">
						Guesses: {guesses.length} / {maxGuesses}
					</div>
				</div>

				{/* Guess Input */}
				{!gameOver && (
					<div className="guess-section">
						<GolferAutocomplete golfers={golfers} onSelect={submitGuess} disabled={submitting} />
					</div>
				)}

				{/* Guess History */}
				<GuessHistory guesses={guesses} />

				{/* Game Over Button */}
				{gameOver && (
					<>
						<button className="show-result-button" onClick={() => setShowGameOver(true)}>
							{won ? "🎉 View Result" : "📊 View Answer"}
						</button>
						{isUnlimitedMode && (
							<button className="next-puzzle-button" onClick={handleNextPuzzle}>
								Next Puzzle ➡️
							</button>
						)}
					</>
				)}
			</main>

			{/* Modals */}
			<StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />

			<GameOverModal
				isOpen={showGameOver}
				won={won}
				answerGolfer={answerGolfer}
				guessCount={guesses.length}
				gameMode={gameMode}
				onClose={() => setShowGameOver(false)}
				isUnlimitedMode={isUnlimitedMode}
				onPlayUnlimited={!isUnlimitedMode ? handlePlayUnlimited : null}
				onNextPuzzle={isUnlimitedMode ? handleNextPuzzle : null}
			/>
		</div>
	);
}

export default App;
