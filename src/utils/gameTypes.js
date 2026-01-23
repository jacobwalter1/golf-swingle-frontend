// Game type definitions for the main page
export const GAME_TYPES = {
	GOLF_SWINGLE: "golf-swingle",
	GUESS_THE_MAJOR: "guess-the-major",
	GUESS_PLAYER_BY_MAJOR_HISTORY: "guess-player-by-major-history",
};

export const GAME_TYPE_CONFIG = {
	[GAME_TYPES.GOLF_SWINGLE]: {
		id: GAME_TYPES.GOLF_SWINGLE,
		name: "Golf Swingle",
		description: "Guess the golfer from their swing video",
		route: "/golf-swingle",
		icon: "⛳",
		available: true,
		comingSoon: false,
	},
	[GAME_TYPES.GUESS_THE_MAJOR]: {
		id: GAME_TYPES.GUESS_THE_MAJOR,
		name: "Guess the Major",
		description: "Identify which major championship is shown",
		route: "/guess-the-major",
		icon: "🏆",
		available: false,
		comingSoon: true,
	},
	[GAME_TYPES.GUESS_PLAYER_BY_MAJOR_HISTORY]: {
		id: GAME_TYPES.GUESS_PLAYER_BY_MAJOR_HISTORY,
		name: "Guess Player by Major History",
		description: "Guess the golfer based on their major championship history",
		route: "/guess-player-by-major-history",
		icon: "📊",
		available: false,
		comingSoon: true,
	},
};

// Get all game types (including coming soon)
export function getAllGameTypes() {
	return Object.values(GAME_TYPE_CONFIG);
}

// Get all available game types
export function getAvailableGameTypes() {
	return Object.values(GAME_TYPE_CONFIG).filter((game) => game.available);
}
