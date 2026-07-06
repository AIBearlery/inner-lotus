// Amelie's MORNING register — LOCKED v1 copy (from the builder's tone review).
// Gentle but awake; close but not watchful; softly energising; never guilt-driven, clinical,
// spooky, or pushy. Flat arrays, zero logic; each rotating pool has enough entries that the
// app can avoid repeats for at least a fortnight.

import type { Energy, Purpose } from '@/types/domain';

/** In-app opening line — also used for the morning push notification for now. */
export const MORNING_OPENERS: string[] = [
  '🌱 Let’s start with one small honest breath.',
  '🍃 Let’s take this first minute before the day takes the rest.',
  '✨ Morning, my friend. Let’s find your footing.',
  '🌼 We’ve arrived at today. Softly counts.',
  '🪟 Let’s look toward the day without grabbing it by the collar.',
  '☀️ Let’s give the day a kind first note.',
  '🌤️ Good morning. Let’s begin gently.',
  '☕ A small morning minute, whenever you’re ready.',
  '🌱 Let’s start with one easy breath.',
  '🕊️ A soft beginning is enough.',
  '🌞 Let’s open the day lightly.',
  '🍃 One quiet minute before the day unfolds.',
  '✨ Morning. Let’s find a simple first step.',
  '🌼 Here’s a gentle place to begin.',
  '🪟 Let’s let the morning in slowly.',
  '🧡 A little steadiness for the start of the day.',
  '🌿 Nothing to force. Just a small beginning.',
  '☀️ Let’s give the day a kind first note.',
  '🫖 We can begin softly.',
  '🌸 A fresh start, kept simple.',
];

/** Step 1 prompt — invite an energy to carry into the morning. */
export const MORNING_ENERGY_PROMPTS: string[] = [
  '🌤️ What energy shall we carry into the morning?',
  '☕ What would feel good to move with today?',
  '🌱 Choose the energy we’ll keep close for the first stretch.',
  '🕊️ What kind of steadiness would help us begin?',
  '🌞 What light do we want to bring into today?',
  '🍃 Pick an energy for us to walk with.',
  '✨ What should we invite into the room this morning?',
  '🌼 What would make the day feel a little more yours?',
  '🪟 Which energy shall we open the window to?',
  '🧡 What do we want beside us today?',
  '🌿 Let’s choose the tone we’ll begin with.',
  '☀️ What energy feels like a good first step?',
  '🫖 What shall we keep warm in the cup today?',
  '🌸 Which feeling should we give a little space to?',
];

/** Step 2 prompt — a gentle purpose for the day. */
export const MORNING_PURPOSE_PROMPTS: string[] = [
  '🌤️ And what shall today gently be for?',
  '☕ What do we want this day to make room for?',
  '🕊️ What would feel worth tending today?',
  '✨ What small purpose shall we carry together?',
  '🌼 What would make today feel well-held?',
  '🪟 Where shall we place our attention today?',
  '🧡 What do we want to protect a little?',
  '☀️ What are we beginning in service of today?',
  '🫖 What quiet intention belongs in the cup?',
  '🌸 What shall we give our care to today?',
  '🌤️ What would feel good to make space for today?',
  '☕ What kind of day shall we gently point toward?',
  '🌱 What would be nice to keep close today?',
  '🕊️ What deserves a little care today?',
  '🌞 What shall today quietly support?',
  '🍃 What would help the day feel more balanced?',
  '✨ What small intention feels right?',
  '🌼 What would make today feel a little more yours?',
  '🪟 Where would you like your attention to rest?',
  '🧡 What would be kind to protect today?',
  '🌿 What should guide the day in a simple way?',
  '☀️ What would be a good direction for today?',
  '🫖 What intention shall we keep warm?',
  '🌸 What would you like to tend, lightly?',
];

/** Occasional, gentle "rhythm" acknowledgments — never streaks or scores. */
export const MORNING_NUDGES: string[] = [
  '🌱 This is how rhythm begins: small, ordinary, repeated.',
  '☕ Another gentle start. We’re making a little path.',
  '🌤️ Not a grand transformation. Just a steady hello to the day.',
  '🍃 These small returns count more than they announce.',
  '🕊️ We’re building a rhythm, one soft beginning at a time.',
  '☀️ A few quiet minutes can become a kind of home.',
  '🫖 Small rituals have a way of remembering us back.',
  '✨ The day gets a little more familiar when we meet it like this.',
  '🪟 We’re leaving breadcrumbs of calm for future us.',
  '🌸 A gentle rhythm is still a rhythm.',
  '🌞 This little beginning is starting to know your name.',
  '🌱 Small starts become familiar in time.',
  '☕ Another gentle morning minute.',
  '🌤️ A quiet beginning can be enough.',
  '🍃 Little returns have their own rhythm.',
  '🕊️ This is a soft way to meet the day.',
  '🌼 Look at that — a tiny ritual forming.',
  '☀️ A few calm minutes can shape the morning.',
  '🧡 A small return, softly made.',
  '🫖 Small rituals can feel like a warm handle on the day.',
  '🌿 No rush. Just this small beginning.',
  '✨ The morning gets easier to enter like this.',
  '🪟 A little steadiness, left here for later.',
  '🌸 Gentle rhythm still counts.',
  '🌞 This beginning is becoming familiar.',
];

/** Step 1 chips — the energy the user wants to invite in (ordered for display). */
export const ENERGY_OPTIONS: readonly Energy[] = [
  'Calm',
  'Bright',
  'Grounded',
  'Light',
  'Focused',
  'Warm',
  'Steady',
  'Open',
];

/** Step 2 chips — the concrete purpose (ordered for display). */
export const PURPOSE_OPTIONS: readonly Purpose[] = [
  'Focus',
  'Peace',
  'Energy',
  'Self-compassion',
  'Letting go',
  'Confidence',
  'Rest',
  'Balance',
];
