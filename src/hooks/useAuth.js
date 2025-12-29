import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import { generateUserId } from "../utils/helpers";

/**
 * Hook to manage user ID
 */
export function useAuth() {
	const [userId, setUserId] = useLocalStorage(STORAGE_KEYS.USER_ID, null);

	useEffect(() => {
		if (!userId) {
			setUserId(generateUserId());
		}
	}, [userId, setUserId]);

	return userId;
}
