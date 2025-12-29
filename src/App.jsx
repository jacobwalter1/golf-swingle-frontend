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
import { useGolfers } from "./hooks/useGolfers";
import { useGameState } from "./hooks/useGameState";
import { GAME_MODES, MODE_CONFIG } from "./utils/constants";

function App() {
	const [showStats, setShowStats] = useState(false);
	const [showGameOver, setShowGameOver] = useState(false);

	// Hooks
	const userId = useAuth();
	const { puzzle, loading: puzzleLoading, error: puzzleError } = useDailyPuzzle();
	const { golfers, loading: golfersLoading, error: golfersError } = useGolfers();

	// Find the answer golfer
	const answerGolfer = useMemo(() => {
		if (!puzzle || !golfers.length) return null;
		return golfers.find((g) => g.id === puzzle.id);
	}, [puzzle, golfers]);

	// Game state
	const { guesses, gameOver, won, currentLevel, gameMode, maxGuesses, submitting, submitGuess, changeMode } = useGameState(
		userId,
		puzzle,
		answerGolfer
	);

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

	// No puzzle or golfers
	if (!puzzle || !answerGolfer) {
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
			<Header onShowStats={() => setShowStats(true)} gameMode={gameMode} onChangeMode={changeMode} />

			<main className="main-content">
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
					<button className="show-result-button" onClick={() => setShowGameOver(true)}>
						{won ? "🎉 View Result" : "📊 View Answer"}
					</button>
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
			/>
		</div>
	);
}

export default App;
