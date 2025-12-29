import { getUserStats } from "../services/storage";

export function StatsModal({ isOpen, onClose }) {
	if (!isOpen) return null;

	const stats = getUserStats();
	const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2>Statistics</h2>
					<button className="close-button" onClick={onClose}>
						✕
					</button>
				</div>

				<div className="modal-content">
					<div className="stats-grid">
						<div className="stat-box">
							<div className="stat-value">{stats.gamesPlayed}</div>
							<div className="stat-label">Played</div>
						</div>
						<div className="stat-box">
							<div className="stat-value">{winRate}%</div>
							<div className="stat-label">Win Rate</div>
						</div>
						<div className="stat-box">
							<div className="stat-value">{stats.currentStreak}</div>
							<div className="stat-label">Current Streak</div>
						</div>
						<div className="stat-box">
							<div className="stat-value">{stats.maxStreak}</div>
							<div className="stat-label">Max Streak</div>
						</div>
					</div>

					<div className="guess-distribution">
						<h3>Guess Distribution</h3>
						{Object.entries(stats.guessDistribution).map(([guessNum, count]) => (
							<div key={guessNum} className="distribution-row">
								<span className="distribution-label">{guessNum}</span>
								<div className="distribution-bar-container">
									<div
										className="distribution-bar"
										style={{
											width: `${stats.gamesWon > 0 ? (count / stats.gamesWon) * 100 : 0}%`,
											minWidth: count > 0 ? "20px" : "0",
										}}
									>
										{count > 0 && <span className="distribution-count">{count}</span>}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
