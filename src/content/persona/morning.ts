// Amelie's MORNING register: brighter, gently easing you awake. Short lines, warm, a
// little dry wit, never guilt ("you missed", "don't forget") and never clinical.
//
// These are flat arrays of plain strings with ZERO logic. Every rotating pool holds at
// least 14 entries so nothing repeats within a two-week stretch (see src/engine/rotation.ts).
// Edit the wording freely here — it can't break behaviour.

import type { Energy, Purpose } from '@/types/domain';

/** Push-notification greetings — the "friend just thought of you" morning ping. */
export const MORNING_GREETING_NOTIFICATIONS: string[] = [
  'Morning, you. A few soft minutes before the day starts asking things.',
  "Psst — it's Amelie. The day can wait a moment. Come say hi.",
  'Good morning. Let’s find your footing first.',
  'Rise gently. I saved you a calm minute or two.',
  'Hey. No rush — just a small, kind start.',
  'Morning light’s here, and so am I. Shall we?',
  'A little pause before the busy? I’ll keep it easy.',
  'Good morning. Nothing to fix — just a moment to arrive.',
  'It’s a new one. Let’s meet it slowly, together.',
  'Morning. Two minutes for you, before everyone else gets them.',
  'Hey you. Let’s set the tone before the day does.',
  'Soft start available. I’ll be right here when you open me.',
  'Good morning. Let’s breathe first, plan later.',
  'The kettle can wait thirty seconds. Come begin with me.',
  'Morning. Let’s give today a gentle first note.',
  'Up and about? Let’s ease in before the rush finds you.',
];

/** In-app opening line, shown when the user actually opens the morning flow. */
export const MORNING_OPENERS: string[] = [
  'Morning. Let’s ease in together.',
  'Hey — glad you’re here. Let’s take it slow.',
  'Good morning. No pressure, just presence.',
  'Well, hello. Ready when you are.',
  'Here we are, at the quiet start of things.',
  'Morning. Let’s find one small steady thing to stand on.',
  'Take a breath with me first. There — now we begin.',
  'Good to see you. Let’s pick what today needs.',
  'Morning. Let’s not rush the waking part.',
  'Settle in. This minute is entirely yours.',
  'Hi. Let’s begin softly and see where it goes.',
  'Morning. Small start, real difference.',
  'You made it here — that’s the whole first step.',
  'Let’s meet the day at your pace, not its.',
  'Good morning. Shall we set the inner weather?',
  'Here, now, unhurried. Let’s start.',
];

/** Step 1 prompt — invite an energy (not a mood). */
export const MORNING_ENERGY_PROMPTS: string[] = [
  'Pick your morning energy.',
  'What do you want to feel today?',
  'Set today’s inner weather.',
  'What’s calling you this morning?',
  'Name the energy you’re inviting in.',
  'What colour is your morning?',
  'Choose what you’d like to grow today.',
  'How do you want to meet the day?',
  'What would feel good to lean into?',
  'Where shall we point the morning?',
  'What’s the tone you’re after?',
  'Pick the feeling you’d like more of.',
  'What does today ask for?',
  'Choose your starting note.',
];

/** Step 2 prompt — a concrete purpose, after the energy is chosen. */
export const MORNING_PURPOSE_PROMPTS: string[] = [
  'Good. And what’s your focus today?',
  'Nice. What would help you get there?',
  'Love that. What do you need most?',
  'What’s one thing that’d support that today?',
  'How can we help that happen?',
  'And what would make that easier to hold?',
  'What would you like today to give you?',
  'Where should we aim that energy?',
  'What’s worth protecting today?',
  'What would help it stick?',
  'And what do you want to come home to tonight?',
  'What’s the quiet goal underneath?',
  'What would today be kinder with?',
  'Name what you’re reaching for.',
];

/** Occasional, frequency-limited nudges. Consistency as rhythm, never streaks or scores. */
export const MORNING_NUDGES: string[] = [
  'Just three minutes. That’s all this asks.',
  'You’ve shown up a few mornings this week — that’s real.',
  'No streak to keep. Only a rhythm to enjoy.',
  'Small and often beats big and never. You’re doing the small.',
  'You’re building something quiet and steady.',
  'Even a minute counts. Especially a minute.',
  'However today lands, arriving is enough.',
  'You keep finding your way back here. I notice that.',
  'This isn’t homework. It’s a little kindness you do for yourself.',
  'Some mornings are two breaths and out. Those count too.',
  'You don’t have to feel it perfectly. You just have to begin.',
  'A gentle start is still a start. Well done being here.',
  'No catching up needed — there’s nothing to be behind on.',
  'Steady, not strict. That’s the whole idea.',
  'Whatever you’ve got today, we’ll work with it.',
  'The fact that you paused at all? That’s the practice.',
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
