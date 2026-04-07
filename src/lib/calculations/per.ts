import { MatchStats } from '@/types';

/**
 * Calculate Player Efficiency Rating (PER)
 * Simplified version based on:
 * PER = (PTS + REB + AST + STL + BLK - Missed FG - Missed FT - TO) / MIN * factor
 */
export function calculatePER(stats: MatchStats): number {
  if (!stats.minutes_played || stats.minutes_played === 0) return 0;

  const missedFG = stats.fg_attempted - stats.fg_made;
  const missedFT = stats.ft_attempted - stats.ft_made;

  const rawPER =
    (stats.points +
      stats.rebounds +
      stats.assists +
      stats.steals +
      stats.blocks -
      missedFG -
      missedFT -
      stats.turnovers) /
    stats.minutes_played;

  // Normalize to typical PER scale (league average ~15)
  const normalizedPER = rawPER * 15;

  return Math.round(normalizedPER * 10) / 10;
}

/**
 * Calculate average PER across multiple games
 */
export function calculateAvgPER(games: MatchStats[]): number {
  if (games.length === 0) return 0;
  const total = games.reduce((sum, g) => sum + calculatePER(g), 0);
  return Math.round((total / games.length) * 10) / 10;
}

/**
 * Calculate shooting percentage
 */
export function shootingPercentage(made: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((made / total) * 1000) / 10;
}

/**
 * Calculate pace in min/km from distance and duration
 */
export function calculatePace(distanceKm: number, durationSeconds: number): string {
  if (distanceKm === 0) return '--:--';
  const paceSeconds = durationSeconds / distanceKm;
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.floor(paceSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format duration in seconds to mm:ss or hh:mm:ss
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Calculate power index from gym stats
 */
export function calculatePowerIndex(
  benchPress: number,
  squat: number,
  deadlift: number,
  bodyWeight: number
): number {
  if (bodyWeight === 0) return 0;
  // Wilks-style relative strength
  const total = benchPress + squat + deadlift;
  return Math.round((total / bodyWeight) * 100) / 100;
}
