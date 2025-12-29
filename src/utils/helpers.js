import { config } from "../config";

/**
 * Generate a unique user ID
 */
export function generateUserId() {
	return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate() {
	const now = new Date();
	return now.toISOString().split("T")[0];
}

/**
 * Get video URL for a golfer at a specific level
 */
export function getVideoUrl(golferPlayerId, level) {
	const levelMap = {
		1: "level1.mp4",
		2: "level2.mp4",
		3: "original.mp4",
	};

	return `${config.s3.videoBaseUrl}/${golferPlayerId}/${levelMap[level]}`;
}

/**
 * Format stat value for display
 */
export function formatStatValue(field, value) {
	if (!value || value === "" || value === 0 || value === "0") {
		return "N/A";
	}

	if (field === "isActive") {
		return value ? "Yes" : "No";
	}

	return value;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Filter golfers by search term
 */
export function filterGolfers(golfers, searchTerm) {
	if (!searchTerm) return [];

	const term = searchTerm.toLowerCase();
	return golfers
		.filter(
			(golfer) =>
				golfer.fullName.toLowerCase().includes(term) ||
				golfer.firstName.toLowerCase().includes(term) ||
				golfer.lastName.toLowerCase().includes(term)
		)
		.slice(0, 10); // Limit to 10 results
}
