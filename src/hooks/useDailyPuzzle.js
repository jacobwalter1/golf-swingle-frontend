import { useState, useEffect } from "react";
import { fetchDailyPuzzle } from "../services/api";
import { getTodayDate } from "../utils/helpers";

/**
 * Hook to fetch and manage daily puzzle
 */
export function useDailyPuzzle() {
	const [puzzle, setPuzzle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function loadPuzzle() {
			try {
				setLoading(true);
				const data = await fetchDailyPuzzle();

				if (mounted) {
					setPuzzle(data);
					setError(null);
				}
			} catch (err) {
				if (mounted) {
					setError(err.message);
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		loadPuzzle();

		return () => {
			mounted = false;
		};
	}, []);

	return { puzzle, loading, error };
}
