import { COMPARISON } from "./constants";

/**
 * Compare two golfers and return comparison results for each stat
 */
export function compareGolfers(guess, answer) {
	const results = {};

	// Age comparison
	const guessAge = parseInt(guess.age) || 0;
	const answerAge = parseInt(answer.age) || 0;

	if (guessAge === answerAge) {
		results.age = COMPARISON.CORRECT;
	} else if (guessAge < answerAge) {
		results.age = COMPARISON.HIGHER;
	} else {
		results.age = COMPARISON.LOWER;
	}

	// Country comparison (exact match)
	results.country = guess.country === answer.country ? COMPARISON.CORRECT : COMPARISON.WRONG;

	// Turned Pro year comparison
	const guessPro = parseInt(guess.turnedPro) || 0;
	const answerPro = parseInt(answer.turnedPro) || 0;

	if (guessPro === answerPro || !guessPro || !answerPro) {
		results.turnedPro = guessPro === answerPro && guessPro ? COMPARISON.CORRECT : COMPARISON.WRONG;
	} else if (guessPro < answerPro) {
		results.turnedPro = COMPARISON.HIGHER;
	} else {
		results.turnedPro = COMPARISON.LOWER;
	}

	// Education comparison (exact match, null/empty values are considered equal)
	const guessEdu = guess.education || null;
	const answerEdu = answer.education || null;
	results.education = guessEdu === answerEdu ? COMPARISON.CORRECT : COMPARISON.WRONG;

	// Is Active comparison (exact match)
	results.isActive = guess.isActive === answer.isActive ? COMPARISON.CORRECT : COMPARISON.WRONG;

	return results;
}

/**
 * Check if guess is correct (all comparisons are correct)
 */
export function isCorrectGuess(comparisonResults) {
	return Object.values(comparisonResults).every((result) => result === COMPARISON.CORRECT);
}
