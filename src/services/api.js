import { config } from "../config";
import { getTodayDate } from "../utils/helpers";

/**
 * Fetch daily puzzle from backend
 */
export async function fetchDailyPuzzle(date = getTodayDate()) {
	try {
		const response = await fetch(`${config.api.getDailyPuzzle}?date=${date}`, {
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


// export async function fetchRandomPuzzle(golfers, excludeIds = []) {
// 	try {
// 		const randomDate = getRandomDate();
// 		// Filter out already used golfers
// 		const availableGolfers = golfers.filter((g) => !excludeIds.includes(g.id));

// 		if (availableGolfers.length === 0) {
// 			// If all golfers have been used, reset and allow all
// 			return getRandomGolfer(golfers);
// 		}

// 		return getRandomGolfer(availableGolfers);
// 	} catch (error) {
// 		console.error("Error generating random puzzle:", error);
// 		throw error;
// 	}
// }

