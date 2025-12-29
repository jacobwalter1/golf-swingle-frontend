import { config } from "../config";

/**
 * Fetch daily puzzle from backend
 */
export async function fetchDailyPuzzle() {
	try {
		const response = await fetch(config.api.getDailyPuzzle, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching daily puzzle:", error);
		throw error;
	}
}

/**
 * Submit a guess to the backend
 */
export async function submitGuess(userId, golferId, guessNumber, guessedGolferIds) {
	try {
		const response = await fetch(config.api.submitGuess, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				guessedGolferId: golferId,
				guessCount: guessNumber,
                guessedGolferIds: guessedGolferIds,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error submitting guess:", error);
		throw error;
	}
}

/**
 * Fetch golfers list from S3
 */
export async function fetchGolfers() {
	try {
		const response = await fetch(config.s3.golfersJsonUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const golfers = await response.json();
		return golfers;
	} catch (error) {
		console.error("Error fetching golfers:", error);
		throw error;
	}
}
