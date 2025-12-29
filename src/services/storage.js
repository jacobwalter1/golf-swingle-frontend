import { STORAGE_KEYS } from "../utils/constants";

/**
 * Get item from localStorage
 */
export function getItem(key) {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	} catch (error) {
		console.error(`Error reading ${key} from localStorage:`, error);
		return null;
	}
}

/**
 * Set item in localStorage
 */
export function setItem(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error writing ${key} to localStorage:`, error);
	}
}

/**
 * Remove item from localStorage
 */
export function removeItem(key) {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(`Error removing ${key} from localStorage:`, error);
	}
}

/**
 * Get or create user ID
 */
export function getUserId() {
	let userId = getItem(STORAGE_KEYS.USER_ID);

	if (!userId) {
		userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
		setItem(STORAGE_KEYS.USER_ID, userId);
	}

	return userId;
}

/**
 * Get current game state
 */
export function getCurrentGame() {
	return getItem(STORAGE_KEYS.CURRENT_GAME);
}

/**
 * Save current game state
 */
export function saveCurrentGame(gameState) {
	setItem(STORAGE_KEYS.CURRENT_GAME, gameState);
}

/**
 * Clear current game
 */
export function clearCurrentGame() {
	removeItem(STORAGE_KEYS.CURRENT_GAME);
}

/**
 * Get game mode
 */
export function getGameMode() {
	return getItem(STORAGE_KEYS.GAME_MODE) || "normal";
}

/**
 * Set game mode
 */
export function setGameMode(mode) {
	setItem(STORAGE_KEYS.GAME_MODE, mode);
}

/**
 * Get user stats
 */
export function getUserStats() {
	return (
		getItem(STORAGE_KEYS.USER_STATS) || {
			gamesPlayed: 0,
			gamesWon: 0,
			currentStreak: 0,
			maxStreak: 0,
			guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
		}
	);
}

/**
 * Update user stats
 */
export function updateUserStats(won, guessNumber) {
	const stats = getUserStats();

	stats.gamesPlayed++;

	if (won) {
		stats.gamesWon++;
		stats.currentStreak++;
		stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
		stats.guessDistribution[guessNumber] = (stats.guessDistribution[guessNumber] || 0) + 1;
	} else {
		stats.currentStreak = 0;
	}

	setItem(STORAGE_KEYS.USER_STATS, stats);
	return stats;
}
