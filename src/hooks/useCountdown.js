import { useState, useEffect } from "react";

/**
 * Hook to countdown to next day (midnight UTC for global consistency)
 * All players worldwide will see the puzzle change at the same moment
 */
export function useCountdown() {
	const [timeRemaining, setTimeRemaining] = useState(getTimeUntilMidnightUTC());

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(getTimeUntilMidnightUTC());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return timeRemaining;
}

/**
 * Calculate time remaining until midnight UTC
 * This ensures all players see the new puzzle at the same time globally
 */
function getTimeUntilMidnightUTC() {
	const now = new Date();
	const tomorrow = new Date(now);
	tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
	tomorrow.setUTCHours(0, 0, 0, 0);

	const diff = tomorrow - now;

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	return {
		hours: String(hours).padStart(2, "0"),
		minutes: String(minutes).padStart(2, "0"),
		seconds: String(seconds).padStart(2, "0"),
		total: diff,
	};
}
