// The morning meditation library — a local constant, not a DB table (fixed set, audio
// ships with the app). Each session shows a short SEED on screen (a zen quote or a
// mini-story, read with eyes open) and then plays AUDIO guidance so the user can close
// their eyes and drop in. The set is reworked to LIFT and PREPARE for the day
// (activation, positive affect, attention, intention) rather than to wind down —
// body-scan/release deliberately lives in the evening instead.
//
// audio.assetId maps to a source resolved in src/lib/audio.ts. Real narration is added
// per the chosen production method; the id/slot stays stable so a recorded (or
// family-recorded) track can replace a placeholder with no other change.

import type { Meditation } from '@/types/domain';

export const MEDITATION_IDS = {
  wakeBody: 'wake-the-body',
  spark: 'spark',
  clearLens: 'clear-the-lens',
  openWarmth: 'open-with-warmth',
  setDay: 'set-the-day',
  steadyStorm: 'steady-the-storm',
} as const;

export const MEDITATIONS: Meditation[] = [
  {
    id: MEDITATION_IDS.wakeBody,
    title: 'Wake the Body',
    serves: { energies: ['Bright', 'Light'], needs: ['Energy'] },
    seed: {
      kind: 'mini_story',
      text: 'A tree doesn’t brace for spring. It just lets the sap rise, one warm inch at a time. Let’s wake like that — no force, only rising.',
    },
    audio: { assetId: 'wake-the-body', durationSec: 210 },
    lengthMin: 4,
  },
  {
    id: MEDITATION_IDS.spark,
    title: 'Spark',
    serves: { energies: ['Bright'], needs: ['Energy'] },
    seed: {
      kind: 'zen_quote',
      text: 'The morning breeze has secrets to tell you. Don’t go back to sleep.',
      attribution: 'Rumi',
    },
    audio: { assetId: 'spark', durationSec: 150 },
    lengthMin: 3,
  },
  {
    id: MEDITATION_IDS.clearLens,
    title: 'Clear the Lens',
    serves: { energies: ['Focused', 'Grounded', 'Steady'], needs: ['Focus', 'Balance'] },
    seed: {
      kind: 'zen_quote',
      text: 'The quieter you become, the more you’re able to hear.',
      attribution: 'Ram Dass',
    },
    audio: { assetId: 'clear-the-lens', durationSec: 240 },
    lengthMin: 4,
  },
  {
    id: MEDITATION_IDS.openWarmth,
    title: 'Open with Warmth',
    serves: { energies: ['Warm', 'Open'], needs: ['Self-compassion', 'Confidence'] },
    seed: {
      kind: 'mini_story',
      text: 'Somewhere, someone is hoping today is gentle with you. Let’s begin by being that someone — first for yourself, then for one other.',
    },
    audio: { assetId: 'open-with-warmth', durationSec: 270 },
    lengthMin: 5,
  },
  {
    id: MEDITATION_IDS.setDay,
    title: 'Set the Day',
    serves: { energies: ['Open', 'Steady'], needs: ['Confidence', 'Balance', 'Focus'] },
    seed: {
      kind: 'zen_quote',
      text: 'The day becomes the shape of the intention you give it. So let’s give it a good one.',
    },
    audio: { assetId: 'set-the-day', durationSec: 210 },
    lengthMin: 4,
  },
  {
    id: MEDITATION_IDS.steadyStorm,
    title: 'Steady the Storm',
    serves: { energies: ['Calm'], needs: ['Peace', 'Letting go', 'Rest'] },
    seed: {
      kind: 'mini_story',
      text: 'Even the roughest night is only weather. And weather passes. Let’s let the wind drop, one long slow breath at a time — enough to begin.',
    },
    audio: { assetId: 'steady-the-storm', durationSec: 270 },
    lengthMin: 5,
  },
];

const MEDITATIONS_BY_ID: Record<string, Meditation> = Object.fromEntries(
  MEDITATIONS.map((m) => [m.id, m]),
);

export function getMeditation(id: string): Meditation | undefined {
  return MEDITATIONS_BY_ID[id];
}
