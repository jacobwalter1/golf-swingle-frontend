import { useState, useEffect } from "react";
import { fetchGolfers } from "../services/api";

/**
 * Hook to fetch and manage golfers list
 */
export function useGolfers() {
	const [golfers, setGolfers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function loadGolfers() {
			try {
				setLoading(true);
				const data = await fetchGolfers();

				if (mounted) {
					setGolfers(data);
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

		loadGolfers();

		return () => {
			mounted = false;
		};
	}, []);

	return { golfers, loading, error };
}
