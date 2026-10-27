/**
 * AI Mystery Room Scoring Engine
 * Rules:
 * - Correct accusation: Easy 100, Medium 150, Hard 200 points
 * - Each discovered clue: +5 points
 * - Each hint used: -10 points
 * - Minimum score: 0
 */

export function calculateScore({ difficulty, isCorrect, discoveredCluesCount = 0, hintsUsedCount = 0 }) {
  const normDiff = (difficulty || 'medium').toLowerCase();
  
  let basePoints = 0;
  if (isCorrect) {
    switch (normDiff) {
      case 'easy':
        basePoints = 100;
        break;
      case 'medium':
        basePoints = 150;
        break;
      case 'hard':
        basePoints = 200;
        break;
      default:
        basePoints = 150;
    }
  }

  const clueBonus = Math.max(0, discoveredCluesCount) * 5;
  const hintPenalty = Math.max(0, hintsUsedCount) * 10;
  const rawScore = basePoints + clueBonus - hintPenalty;
  const finalScore = Math.max(0, rawScore);

  return {
    basePoints,
    clueBonus,
    hintPenalty,
    total: finalScore
  };
}
