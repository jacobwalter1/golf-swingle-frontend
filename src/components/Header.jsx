import { GAME_MODES, MODE_CONFIG } from "../utils/constants";

export function Header({ onShowStats, gameMode, onChangeMode }) {
	return (
		<header className="header">
			<div className="header-content">
				<div className="header-left">
					<h1 className="logo">⛳ Golf Swingle</h1>
				</div>
				<div className="header-right">
					<select
						className="difficulty-selector"
						value={gameMode}
						onChange={(e) => onChangeMode(e.target.value)}
						title="Change difficulty"
					>
						{Object.entries(GAME_MODES).map(([key, mode]) => (
							<option key={mode} value={mode}>
								{MODE_CONFIG[mode].label}
							</option>
						))}
					</select>
					<button className="stats-button" onClick={onShowStats}>
						📊 Stats
					</button>
				</div>
			</div>
		</header>
	);
}
