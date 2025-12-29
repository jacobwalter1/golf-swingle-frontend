export const config = {
	api: {
		getDailyPuzzle: import.meta.env.VITE_API_GET_DAILY_PUZZLE,
		submitGuess: import.meta.env.VITE_API_SUBMIT_GUESS,
	},
	s3: {
		golfersJsonUrl: import.meta.env.VITE_GOLFERS_JSON_URL,
		videoBaseUrl: import.meta.env.VITE_VIDEO_BASE_URL,
	},
};
