import { GAME_MODES, MODE_CONFIG } from "../utils/constants";

export function GameOverModal({
	isOpen,
	won,
	answerGolfer,
	guessCount,
	onClose,
	gameMode,
	isUnlimitedMode,
	onPlayUnlimited,
	onNextPuzzle,
}) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal game-over-modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2>{won ? "🎉 You Win!" : "❌ Game Over"}</h2>
					<button className="close-button" onClick={onClose}>
						✕
					</button>
				</div>

				<div className="modal-content">
					{won ? (
						<div className="win-message">
							<p className="congrats">Congratulations!</p>
							<p className="guess-count">
								You guessed it in {guessCount} {guessCount === 1 ? "try" : "tries"}!
							</p>
						</div>
					) : (
						<div className="lose-message">
							<p className="better-luck">{isUnlimitedMode ? "Better luck next time!" : "Better luck tomorrow!"}</p>
						</div>
					)}

					<div className="answer-reveal">
						<img
							src={answerGolfer.headshotUrl}
							alt={answerGolfer.fullName}
							className="answer-avatar"
							onError={(e) => {
								e.target.style.display = "none";
							}}
						/>
						<h3 className="answer-name">{answerGolfer.fullName}</h3>
						<div className="answer-stats">
							<p>Age: {answerGolfer.age || "N/A"}</p>
							<p>Country: {answerGolfer.country || "N/A"}</p>
							<p>Turned Pro: {answerGolfer.turnedPro || "N/A"}</p>
							{answerGolfer.education && <p>Education: {answerGolfer.education}</p>}
							<p>PGA Active: {answerGolfer.isActive ? "Yes" : "No"}</p>
						</div>
					</div>

					<div className="difficulty-played">
						<p>
							You played on <strong>{MODE_CONFIG[gameMode].label}</strong> difficulty
						</p>
					</div>

					{!isUnlimitedMode ? (
						<>
							<p className="next-game">Come back tomorrow for a new puzzle! 🏌️</p>
							{onPlayUnlimited && (
								<button className="unlimited-button" onClick={onPlayUnlimited}>
									🎮 Play Unlimited Mode
								</button>
							)}
						</>
					) : (
						<>
							<p className="next-game">Ready for another challenge?</p>
							{onNextPuzzle && (
								<button className="unlimited-button" onClick={onNextPuzzle}>
									Next Puzzle ➡️
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
