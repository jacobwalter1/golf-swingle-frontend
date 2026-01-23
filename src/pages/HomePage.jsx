import { getAllGameTypes } from "../utils/gameTypes";
import { GameCard } from "../components/GameCard";

export function HomePage() {
	const allGames = getAllGameTypes();

	return (
		<div className="app">
			<header className="header">
				<div className="header-content">
					<div className="header-left">
						<h1 className="logo">⛳ Golf Swingle</h1>
					</div>
				</div>
			</header>

			<main className="home-content">
				<div className="home-hero">
					<h2 className="home-title">Choose a Game</h2>
					<p className="home-subtitle">Select a game to start playing</p>
				</div>

				<div className="games-grid">
					{allGames.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</main>
		</div>
	);
}
