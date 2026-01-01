import { COMPARISON } from "./constants";

/**
 * Compare two golfers and return comparison results for each stat
 */
export function compareGolfers(guessedGolfer, targetGolfer) {
  return {
    age: compareNumbers(guessedGolfer.age, targetGolfer.age, 3),
    country: compareExact(guessedGolfer.country, targetGolfer.country),
    turnedPro: compareNumbers(guessedGolfer.turnedPro, targetGolfer.turnedPro, 3),
    education: compareExact(guessedGolfer.education, targetGolfer.education),
    isActive: compareExact(guessedGolfer.isActive, targetGolfer.isActive),
  };
}

function compareNumbers(guessedValue, targetValue, closeThreshold = 3) {
  if (!guessedValue || !targetValue) return COMPARISON.WRONG;
  if (guessedValue === targetValue) return COMPARISON.CORRECT;
  const diff = Math.abs(guessedValue - targetValue);
  if (diff <= closeThreshold) return guessedValue < targetValue ? COMPARISON.CLOSELOWER : COMPARISON.CLOSEHIGHER;
  return guessedValue < targetValue ? COMPARISON.HIGHER : COMPARISON.LOWER;
}

function compareExact(guessedValue, targetValue) {
  if (!guessedValue || !targetValue) return COMPARISON.WRONG;
  return guessedValue === targetValue ? COMPARISON.CORRECT : COMPARISON.WRONG;
}
