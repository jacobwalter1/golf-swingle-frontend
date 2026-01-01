import { MODE_CONFIG } from "../utils/constants";

/**
 * Get the current video level based on game mode and guess number
 */
export function getCurrentVideoLevel(mode, guessNumber) {
	const modeConfig = MODE_CONFIG[mode];
	if (!modeConfig) return 1;

	const index = Math.min(guessNumber, modeConfig.videoLevels.length - 1);
	return modeConfig.videoLevels[index];
}

export function isCorrectGuess(guessedId, targetId) {
	return guessedId === targetId;
}

export function calculateNewStats(currentStats, won, guessCount, date) {
	const isNewStreak = currentStats.lastPlayedDate ? isConsecutiveDay(currentStats.lastPlayedDate, date) : true;

	const newStreak = won ? (isNewStreak ? currentStats.currentStreak + 1 : 1) : 0;

	return {
		...currentStats,
		gamesPlayed: currentStats.gamesPlayed + 1,
		gamesWon: won ? currentStats.gamesWon + 1 : currentStats.gamesWon,
		currentStreak: newStreak,
		maxStreak: Math.max(currentStats.maxStreak, newStreak),
		guessDistribution: {
			...currentStats.guessDistribution,
			[guessCount]: (currentStats.guessDistribution[guessCount] || 0) + (won ? 1 : 0),
		},
		lastPlayedDate: date,
	};
}

export function isConsecutiveDay(date1, date2) {
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	const diffTime = Math.abs(d2 - d1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays === 1;
}

export function getTodayDate() {
	return new Date().toISOString().split("T")[0];
}

export function isGameOver(guessCount, isCorrect) {
	return isCorrect || guessCount >= 6;
}

export function getRandomPastDateList() {
	const start = new Date(2025, 11, 28);
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	const dateList = [];
	for (let d = new Date(start); d <= yesterday; d.setDate(d.getDate() + 1)) {
		dateList.push(new Date(d));
	}

  const randomizedDateList = [];
  while (dateList.length !== 0){
    const index = Math.floor(Math.random() * dateList.length);
    const date = dateList[index];
    dateList.splice(index, 1);
    randomizedDateList.push(date);
  }
  
  return randomizedDateList;
}
