import { useState, useCallback } from "react";
import { fetchDailyPuzzle } from "../services/api";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import { getRandomPastDateList } from "../services/gameLogic";

/**
 * Hook to manage unlimited mode puzzles
 */
export function useUnlimitedPuzzle() {
	const [puzzle, setPuzzle] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [randomDateList, setRandomDateList] = useState(() => getRandomPastDateList());
	const [usedDates, setUsedDates] = useLocalStorage(STORAGE_KEYS.UNLIMITED_USED_DATES, []);

	// Load a new random puzzle
	const loadNewPuzzle = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Get the next date from the randomized list
			const dateToFetch = randomDateList[usedDates.length];

			if (!dateToFetch) {
				// If we've run out of dates, generate a new list and reset
				const newDateList = getRandomPastDateList();
				setRandomDateList(newDateList);
				setUsedDates([]);
				const randomPuzzle = await fetchDailyPuzzle(newDateList[0].toISOString().split("T")[0]);
				setPuzzle(randomPuzzle);
				setUsedDates([newDateList[0].toISOString().split("T")[0]]);
			} else {
				const dateString = dateToFetch.toISOString().split("T")[0];
				const randomPuzzle = await fetchDailyPuzzle(dateString);
				setPuzzle(randomPuzzle);

				// Add this date to used list
				setUsedDates([...usedDates, dateString]);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [usedDates, setUsedDates, randomDateList]);

	// Reset used dates (allows replaying all puzzles)
	const resetUsedDates = useCallback(() => {
		setUsedDates([]);
		setRandomDateList(getRandomPastDateList());
	}, [setUsedDates]);

	return {
		puzzle,
		loading,
		error,
		loadNewPuzzle,
		resetUsedDates,
		usedCount: usedDates.length,
	};
}
