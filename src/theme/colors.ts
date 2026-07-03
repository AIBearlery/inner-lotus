// Inner Lotus palette — soft, dawn-inspired, warm and grounded (never cold or clinical).
// Two schemes (light + a deep indigo/plum dark mode) and per-window background gradients
// that carry the time-of-day mood: morning gently bright, midday brightest, evening soft.

import type { DayWindow } from '@/types/domain';

/** Raw, non-semantic color values. Prefer the semantic `light`/`dark` tokens in UI. */
export const palette = {
  // Warm neutrals
  cream: '#FFF8F1',
  ink: '#332A2A',
  muted: '#7A6B68',
  // Dawn accents
  lotus: '#D96F9F', // signature pink — Amelie's accent
  peach: '#F8B88B',
  gold: '#F6D36B',
  mist: '#BBDDE6',
  lavender: '#CDBEEB',
  sage: '#C9D8B6',
  // Dark-mode base (deep indigo/plum)
  plum: '#241B33',
  indigo: '#2E2545',
  duskInk: '#F3ECF5',
  duskMuted: '#B7A9C6',
} as const;

export type ColorScheme = {
  background: string;
  surface: string; // translucent-warm card
  surfaceStrong: string; // opaque card
  border: string;
  ink: string; // primary text
  muted: string; // secondary text
  primary: string; // Amelie accent / key actions
  onPrimary: string;
  /** Color used specifically for Amelie's spoken lines (reads as her "voice"). */
  amelieVoice: string;
  shadow: string;
};

export const light: ColorScheme = {
  background: palette.cream,
  surface: 'rgba(255, 255, 255, 0.72)',
  surfaceStrong: '#FFFFFF',
  border: 'rgba(255, 255, 255, 0.85)',
  ink: palette.ink,
  muted: palette.muted,
  primary: palette.lotus,
  onPrimary: '#FFFFFF',
  amelieVoice: '#6E4A63',
  shadow: 'rgba(90, 56, 42, 0.18)',
};

export const dark: ColorScheme = {
  background: palette.plum,
  surface: 'rgba(255, 255, 255, 0.06)',
  surfaceStrong: palette.indigo,
  border: 'rgba(255, 255, 255, 0.12)',
  ink: palette.duskInk,
  muted: palette.duskMuted,
  primary: palette.lotus,
  onPrimary: '#2A1830',
  amelieVoice: '#E7C7DC',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

/**
 * Background gradient stops per time-of-day window. Warm and soft — the orb's glow is
 * tuned to sit against these without ever looking spectral.
 */
export const gradients: Record<DayWindow, { light: string[]; dark: string[] }> = {
  morning: {
    light: ['#FFF8F1', '#FFE4D2', '#F7D6E5'],
    dark: ['#241B33', '#3A2740', '#432B3E'],
  },
  midday: {
    light: ['#FFFBEF', '#FFE9C9', '#FBD7C2'],
    dark: ['#241B33', '#3E2E3A', '#4A3330'],
  },
  evening: {
    light: ['#F3E9F5', '#DCC9EB', '#BBAAD9'],
    dark: ['#1C1530', '#241B39', '#2E2545'],
  },
};

export function schemeFor(mode: 'light' | 'dark'): ColorScheme {
  return mode === 'dark' ? dark : light;
}
