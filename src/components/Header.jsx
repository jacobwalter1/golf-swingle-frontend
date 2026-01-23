import { Link } from "react-router-dom";
import { GAME_MODES, MODE_CONFIG } from "../utils/constants";
import { useCountdown } from "../hooks/useCountdown";

export function Header({ onShowStats, gameMode, onChangeMode, dailyPuzzleComplete, isUnlimitedMode, onPlayUnlimited, onBackToDaily }) {
	const countdown = useCountdown();

	return (
		<header className="header">
			<div className="header-content">
				<div className="header-left">
					<Link to="/" className="logo-link">
						<h1 className="logo">⛳ Golf Swingle</h1>
					</Link>
					{dailyPuzzleComplete && !isUnlimitedMode && (
						<div className="header-countdown">
							<span className="countdown-text">Next puzzle:</span>
							<span className="countdown-time">
								{countdown.hours}:{countdown.minutes}:{countdown.seconds}
							</span>
						</div>
					)}
				</div>
				<div className="header-right">
					<Link to="/" className="home-button">
						Home
					</Link>
					{dailyPuzzleComplete && !isUnlimitedMode && (
						<button className="unlimited-toggle-button" onClick={onPlayUnlimited}>
							Play Unlimited
						</button>
					)}
					{isUnlimitedMode && (
						<button className="back-to-daily-button" onClick={onBackToDaily}>
							Back to Daily
						</button>
					)}
					<select
						className="difficulty-selector"
						value={gameMode}
						onChange={(e) => onChangeMode(e.target.value)}
						title="Change difficulty"
					>
						{Object.entries(GAME_MODES)
							.filter(([key, mode]) => mode !== GAME_MODES.UNLIMITED)
							.map(([key, mode]) => (
								<option key={mode} value={mode}>
									{MODE_CONFIG[mode].label}
								</option>
							))}
					</select>
					<button className="stats-button" onClick={onShowStats}>
						Stats
					</button>
				</div>
			</div>
		</header>
	);
}
