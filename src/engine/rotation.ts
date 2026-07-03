// Pure rotation logic for the copy pools. Guarantees a line doesn't repeat within the
// recent window: given a pool and the recently-shown values (most-recent-first), it
// excludes the last N and picks from what's left. With pools of >=14 entries and the
// default window this yields no repeat within ~two weeks (one pick per pool per day).
//
// No React, no storage, no Date here — callers pass in the recent history and (optionally)
// an rng, which keeps this fully unit-testable.

export type Rng = () => number;

const defaultRng: Rng = Math.random;

/**
 * Pick a fresh entry from `pool`, avoiding the most recently used ones.
 *
 * @param pool               all available entries
 * @param recentMostRecentFirst  previously shown entries, newest first
 * @param noRepeatWithin     how many recent entries to avoid (default 13, i.e. the 14th
 *                           day can reuse). Automatically clamped so at least one entry
 *                           always remains eligible.
 */
export function pickFresh(
  pool: string[],
  recentMostRecentFirst: string[] = [],
  noRepeatWithin = 13,
  rng: Rng = defaultRng,
): string {
  if (pool.length === 0) {
    throw new Error('pickFresh called with an empty pool');
  }
  if (pool.length === 1) {
    return pool[0];
  }

  const blockCount = Math.min(noRepeatWithin, pool.length - 1);
  const blocked = new Set(recentMostRecentFirst.slice(0, blockCount));
  const eligible = pool.filter((entry) => !blocked.has(entry));
  const choices = eligible.length > 0 ? eligible : pool;

  return choices[Math.floor(rng() * choices.length)];
}

/**
 * Append a freshly shown value to a recent-history list (most-recent-first) and cap its
 * length. Callers persist the returned array (e.g. in AsyncStorage).
 */
export function recordShown(value: string, recent: string[] = [], cap = 20): string[] {
  return [value, ...recent.filter((v) => v !== value)].slice(0, cap);
}
