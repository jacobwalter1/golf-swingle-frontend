// Game modes configuration
export const GAME_MODES = {
	HARD: "hard",
	NORMAL: "normal",
	EASY: "easy",
	UNLIMITED: "unlimited",
};

export const MODE_CONFIG = {
	[GAME_MODES.HARD]: {
		maxGuesses: 6,
		videoLevels: [1, 1, 1, 1, 1, 1], // Always level 1
		label: "Hard",
		description: "Silhouette only",
	},
	[GAME_MODES.NORMAL]: {
		maxGuesses: 6,
		videoLevels: [1, 1, 1, 2, 2, 2], // 3 on level 1, 3 on level 2
		label: "Normal",
		description: "3 guesses silhouette, 3 blurred",
	},
	[GAME_MODES.EASY]: {
		maxGuesses: 6,
		videoLevels: [2, 2, 2, 2, 2, 2], // Always level 2
		label: "Easy",
		description: "Blurred face only",
	},
	[GAME_MODES.UNLIMITED]: {
		maxGuesses: 6,
		videoLevels: [1, 1, 1, 2, 2, 2], // Same as normal mode
		label: "Unlimited",
		description: "Practice with past puzzles",
	},
};

// Video levels
export const VIDEO_LEVELS = {
	SILHOUETTE: 1,
	BLURRED: 2,
	ORIGINAL: 3,
};

// Comparison result indicators
export const COMPARISON = {
	CLOSEHIGHER: "close-higher",
	CLOSELOWER: "close-lower",
	CORRECT: "correct",
	HIGHER: "higher",
	LOWER: "lower",
	WRONG: "wrong",
};

// Local storage keys
export const STORAGE_KEYS = {
	USER_ID: "golf_wordle_user_id",
	GAME_MODE: "golf_wordle_mode",
	CURRENT_GAME: "golf_wordle_current_game",
	UNLIMITED_GAME: "golf_wordle_unlimited_game",
	UNLIMITED_USED_DATES: "golf_wordle_unlimited_used_dates",
	UNLIMITED_USED_GOLFERS: "golf_wordle_unlimited_used",
	USER_STATS: "golf_wordle_stats",
};

// Stat fields to compare
export const COMPARISON_FIELDS = {
	AGE: "age",
	COUNTRY: "country",
	TURNED_PRO: "turnedPro",
	EDUCATION: "education",
	IS_ACTIVE: "isActive",
};

export const STAT_LABELS = {
	[COMPARISON_FIELDS.AGE]: "Age",
	[COMPARISON_FIELDS.COUNTRY]: "Country",
	[COMPARISON_FIELDS.TURNED_PRO]: "Turned Pro",
	[COMPARISON_FIELDS.EDUCATION]: "Education",
	[COMPARISON_FIELDS.IS_ACTIVE]: "PGA Active",
};
