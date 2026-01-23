import { Link } from "react-router-dom";

export function GameCard({ game }) {
	const isComingSoon = game.comingSoon || !game.available;
	const cardContent = (
		<>
			<div className="game-card-icon">{game.icon}</div>
			<div className="game-card-content">
				<h3 className="game-card-title">{game.name}</h3>
				<p className="game-card-description">{game.description}</p>
				{isComingSoon && (
					<span className="game-card-coming-soon">Coming Soon</span>
				)}
			</div>
			{!isComingSoon && <div className="game-card-arrow">→</div>}
		</>
	);

	if (isComingSoon) {
		return (
			<div className="game-card game-card-coming-soon-disabled">
				{cardContent}
			</div>
		);
	}

	return (
		<Link to={game.route} className="game-card">
			{cardContent}
		</Link>
	);
}
