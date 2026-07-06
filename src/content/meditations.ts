// The morning meditation library — a local constant, not a DB table (fixed set, audio ships
// with the app). Each session shows a short SEED on screen (eyes open) and then plays AUDIO
// guidance so the user can close their eyes. The set is reworked to LIFT and PREPARE for the
// day (activation, positive affect, attention, intention), not to wind down — body-scan lives
// in the evening instead. Seeds are LOCKED v1 (from the meditation scripts working draft).
//
// audio.assetId maps to a source resolved in src/lib/audio.ts. Real narration is added per the
// chosen production method; the id/slot stays stable so a recorded (or family-recorded) track
// can replace a placeholder with no other change.

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
      text: 'Morning can begin quietly. A little breath, a little feeling, a little light returning to the body.',
    },
    audio: { assetId: 'wake-the-body', durationSec: 240 },
    lengthMin: 4,
  },
  {
    id: MEDITATION_IDS.spark,
    title: 'Spark',
    serves: { energies: ['Bright'], needs: ['Energy'] },
    seed: {
      kind: 'mini_story',
      text: 'Energy doesn’t have to burst in. Sometimes it arrives as one clean breath, then another.',
    },
    audio: { assetId: 'spark', durationSec: 180 },
    lengthMin: 3,
  },
  {
    id: MEDITATION_IDS.clearLens,
    title: 'Clear the Lens',
    serves: { energies: ['Focused', 'Grounded', 'Steady'], needs: ['Focus', 'Balance'] },
    seed: {
      kind: 'mini_story',
      text: 'Before the day fills the room, let’s clear one small window for the mind.',
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
      text: 'Warmth can start very small: one kind breath inward, one kind thought outward.',
    },
    audio: { assetId: 'open-with-warmth', durationSec: 300 },
    lengthMin: 5,
  },
  {
    id: MEDITATION_IDS.setDay,
    title: 'Set the Day',
    serves: { energies: ['Open', 'Steady'], needs: ['Confidence', 'Balance', 'Focus'] },
    seed: {
      kind: 'mini_story',
      text: 'Today doesn’t need a grand plan. Just a gentle direction to return to.',
    },
    audio: { assetId: 'set-the-day', durationSec: 240 },
    lengthMin: 4,
  },
  {
    id: MEDITATION_IDS.steadyStorm,
    title: 'Steady the Storm',
    serves: { energies: ['Calm'], needs: ['Peace', 'Letting go', 'Rest'] },
    seed: {
      kind: 'mini_story',
      text: 'Some mornings arrive unevenly. We can begin softly, one slower breath at a time.',
    },
    audio: { assetId: 'steady-the-storm', durationSec: 300 },
    lengthMin: 5,
  },
];

/**
 * The optional evening wind-down (body-scan / release) — this is where body-scan lives, kept
 * out of the mornings. Not part of the morning recommendation set. Audio to be recorded; until
 * then it plays the gentle guided-breathing placeholder.
 */
export const EVENING_WINDDOWN: Meditation = {
  id: 'evening-wind-down',
  title: 'Evening Wind-Down',
  serves: { energies: [], needs: [] },
  seed: {
    kind: 'mini_story',
    text: 'The day can set itself down now. A slow breath, and the body softening, piece by piece.',
  },
  audio: { assetId: 'evening-wind-down', durationSec: 300 },
  lengthMin: 5,
};

const MEDITATIONS_BY_ID: Record<string, Meditation> = Object.fromEntries(
  [...MEDITATIONS, EVENING_WINDDOWN].map((m) => [m.id, m]),
);

export function getMeditation(id: string): Meditation | undefined {
  return MEDITATIONS_BY_ID[id];
}
