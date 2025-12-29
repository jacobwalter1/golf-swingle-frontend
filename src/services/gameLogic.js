import { MODE_CONFIG } from '../utils/constants';

/**
 * Get the current video level based on game mode and guess number
 */
export function getCurrentVideoLevel(mode, guessNumber) {
  const modeConfig = MODE_CONFIG[mode];
  if (!modeConfig) return 1;
  
  const index = Math.min(guessNumber, modeConfig.videoLevels.length - 1);
  return modeConfig.videoLevels[index];
}


