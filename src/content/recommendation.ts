// Deterministic, hand-editable recommendation — no AI. The user's two morning picks
// (purpose + energy) map to one meditation. `NEED_TO_MEDITATIONS` is the primary lookup
// (purpose drives the choice); `FEELING_AFFINITY` breaks ties by the chosen energy.

import { MEDITATION_IDS, getMeditation } from '@/content/meditations';
import type { Energy, Meditation, Purpose } from '@/types/domain';

const M = MEDITATION_IDS;

/** Primary lookup: each purpose lists candidate meditations, best-first. */
export const NEED_TO_MEDITATIONS: Record<Purpose, string[]> = {
  Focus: [M.clearLens, M.setDay],
  Peace: [M.steadyStorm, M.openWarmth],
  Energy: [M.wakeBody, M.spark],
  'Self-compassion': [M.openWarmth],
  'Letting go': [M.steadyStorm],
  Confidence: [M.setDay, M.openWarmth],
  Rest: [M.steadyStorm],
  Balance: [M.setDay, M.clearLens],
};

/** Tiebreaker: when a purpose has several candidates, prefer one that fits the energy. */
export const FEELING_AFFINITY: Record<Energy, string[]> = {
  Calm: [M.steadyStorm, M.openWarmth],
  Bright: [M.spark, M.wakeBody],
  Grounded: [M.clearLens, M.setDay],
  Light: [M.wakeBody, M.spark],
  Focused: [M.clearLens, M.setDay],
  Warm: [M.openWarmth],
  Steady: [M.setDay, M.clearLens, M.steadyStorm],
  Open: [M.openWarmth, M.setDay],
};

/**
 * Returns the recommended meditation for the pair. Always resolves to a real session:
 * the purpose lookup is exhaustive, and we fall back to the first meditation if a lookup
 * were ever left empty by an edit.
 */
export function getRecommendedMeditation(energy: Energy, purpose: Purpose): Meditation {
  const candidates = NEED_TO_MEDITATIONS[purpose] ?? [];
  const affinity = FEELING_AFFINITY[energy] ?? [];

  // Prefer a candidate that also appears in this energy's affinity list.
  const preferred = candidates.find((id) => affinity.includes(id));
  const chosenId = preferred ?? candidates[0] ?? M.setDay;

  const meditation = getMeditation(chosenId);
  if (!meditation) {
    throw new Error(`Recommendation resolved to unknown meditation id: ${chosenId}`);
  }
  return meditation;
}
