// Pure pacing for the gentle morning nudges. Rules (all non-competitive):
//   - never on the user's very first day,
//   - a minimum gap of a few days between nudges,
//   - light jitter so it never feels scripted.
// State (last-nudge date, check-in count) lives in AsyncStorage — this is just ephemeral
// UI pacing, not journal data. Kept pure: pass in `now` and `rng` for testability.

import type { Rng } from './rotation';

export type NudgeInput = {
  /** ISO date (or null) of the last time a nudge was shown. */
  lastNudgeAt: string | null;
  /** How many mornings the user has checked in overall. */
  totalCheckIns: number;
  /** Current moment. */
  now?: Date;
  /** Minimum days between nudges. */
  minGapDays?: number;
  rng?: Rng;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function shouldShowNudge({
  lastNudgeAt,
  totalCheckIns,
  now = new Date(),
  minGapDays = 4,
  rng = Math.random,
}: NudgeInput): boolean {
  // Never on day one — let the habit breathe before we comment on it.
  if (totalCheckIns < 2) {
    return false;
  }

  if (lastNudgeAt) {
    const daysSince = (now.getTime() - new Date(lastNudgeAt).getTime()) / MS_PER_DAY;
    if (daysSince < minGapDays) {
      return false;
    }
  }

  // Past the gap: show with a jittered probability so it feels spontaneous, not clockwork.
  return rng() < 0.5;
}
