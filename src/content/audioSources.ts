// Registry mapping each meditation's audio assetId to a bundled audio file.
//
// The recordings don't exist yet (they're being recorded from docs/meditation-scripts.md).
// Until a file is present, its line stays commented out and the player falls back to a
// gentle guided-breathing placeholder — the morning flow still works end-to-end.
//
// TO ADD A RECORDING (no other code changes needed):
//   1. Drop the file into assets/audio/ using the exact name shown below.
//   2. Uncomment that one line.
// Metro requires a STATIC require() per file (it can't require a variable path), which is
// why each source is listed explicitly here.

import type { AudioSource } from 'expo-audio';

export const AUDIO_SOURCES: Record<string, AudioSource> = {
  // 'wake-the-body': require('../../assets/audio/wake-the-body.m4a'),
  // 'spark': require('../../assets/audio/spark.m4a'),
  // 'clear-the-lens': require('../../assets/audio/clear-the-lens.m4a'),
  // 'open-with-warmth': require('../../assets/audio/open-with-warmth.m4a'),
  // 'set-the-day': require('../../assets/audio/set-the-day.m4a'),
  // 'steady-the-storm': require('../../assets/audio/steady-the-storm.m4a'),
};

/** Returns the bundled source for an assetId, or null if it hasn't been recorded yet. */
export function getAudioSource(assetId: string): AudioSource | null {
  return AUDIO_SOURCES[assetId] ?? null;
}

/** True when at least one real recording is wired up (useful for gentle UI messaging). */
export function hasAnyAudio(): boolean {
  return Object.keys(AUDIO_SOURCES).length > 0;
}
