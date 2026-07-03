// Audio-mode setup for meditation playback (expo-audio, SDK 57).
// Key choice: playsInSilentMode = true, so guidance is still audible when the iPhone's
// ring switch is set to silent — people meditate with their phone on silent.

import { setAudioModeAsync } from 'expo-audio';

let configured = false;

/** Call once before starting playback. Safe to call repeatedly (no-ops after the first). */
export async function configureAudioModeForPlayback(): Promise<void> {
  if (configured) return;
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      // Lower other apps' audio rather than hard-stopping it.
      interruptionMode: 'duckOthers',
    });
    configured = true;
  } catch {
    // Non-fatal: playback still works, just without the silent-mode override.
  }
}
