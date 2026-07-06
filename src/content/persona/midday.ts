// Amelie's MIDDAY register — LOCKED v1 copy. Her brightest, lightest voice: a warm one-line
// text in the middle of the day. One line only, no tasks, no check-ins, no implied strain.
// Tailored lines refer gently to the positive QUALITY itself, never "you chose X this morning".

import type { Energy, Purpose } from '@/types/domain';

/** The general midday lift — used for the scheduled notification and the default in-app line. */
export const MIDDAY_BOOSTERS: string[] = [
  '🌤️ Tiny midday hello. Hope the day is being decent to you.',
  '☀️ A little light for the middle of the day.',
  '🍃 One soft breath, then back into the world.',
  '🌼 Midday hello from the friendly corner.',
  '☕ Hope there’s been at least one good sip today.',
  '✨ A little brightness, delivered quietly.',
  '🪟 Window open, shoulders down, carry on.',
  '🌱 May the next bit of today be a little easier.',
  '🌞 A small warm note for your afternoon pocket.',
  '🍯 Hope something today has been gentler than expected.',
  '🕊️ One calm breath in the middle of it all.',
  '🌸 A little softness for the day’s middle.',
  '☕ May your next sip taste like a tiny improvement.',
  '🌤️ The day is halfway-ish. We respect its confidence.',
  '🧡 A warm little nudge from the middle of the day.',
  '✨ May the afternoon arrive with less nonsense than expected.',
  '🍃 Tiny reset. Nothing ceremonial.',
  '🌼 Just passing by with a small bit of cheer.',
  '🪟 Let a little air into the day.',
  '☀️ A small sunbeam for the next stretch.',
  '🫖 The middle of the day deserves a softer edge.',
  '🍯 A tiny spoonful of ease for the afternoon.',
  '🌞 A cheerful little hello from the brighter side of Amelie.',
  '☕ Here’s to the next small pleasant thing.',
  '🌿 A little green edge for the middle of the day.',
  '🌼 A tiny bright thing, just because.',
  '🫖 Midday, softened at the corners.',
  '☀️ A little warmth for whatever comes next.',
  '🍃 A small lift, lightly offered.',
  '✨ A glimmer for the afternoon pocket.',
];

/** Optional lines that gently echo the morning's chosen energy (the quality, not the choice). */
export const MIDDAY_TAILORED_BY_ENERGY: Record<Energy, string[]> = {
  Calm: [
    '🕊️ A little calm can sit quietly in the middle of the day.',
    '🍃 A soft breath, if the day has room for one.',
    '🫖 Calm, kept close like a warm cup.',
    '🌤️ A small calm note for the next stretch.',
    '🌸 A gentler edge for the afternoon.',
  ],
  Bright: [
    '☀️ A little brightness for the next bit.',
    '✨ Bright can be quiet too. A small sparkle counts.',
    '🌼 Keeping a little brightness in the middle of the day.',
    '🌞 A warm bright note for the afternoon.',
    '🪟 A little more light through the window.',
  ],
  Grounded: [
    '🌱 A little groundedness for the middle of the day.',
    '🌿 One simple breath, one simple next step.',
    '🪟 A little steadiness for the afternoon.',
    '🍃 Grounded, but not heavy.',
    '☕ A steady note, warm enough to hold.',
  ],
  Light: [
    '🍃 A light touch for the middle of the day.',
    '🌤️ May the next bit feel a little lighter.',
    '🌼 Keeping things light where we can.',
    '✨ A tiny lift for the afternoon.',
    '🪟 A little more air around the day.',
  ],
  Focused: [
    '🪟 A little clear light for the next stretch.',
    '🌱 Focus can be gentle. Just the next small step.',
    '☀️ One clear thing is enough.',
    '🍃 Keeping focus simple, not stern.',
    '✨ A tiny clean edge for the afternoon.',
  ],
  Warm: [
    '🧡 A little warmth for the middle of the day.',
    '☕ Warmth travels well into the afternoon.',
    '🌼 A warm note for the next stretch.',
    '🫖 Keeping warmth nearby, no fuss.',
    '🍯 Something soft and golden for the afternoon.',
  ],
  Steady: [
    '🌿 A little steadiness for the next stretch.',
    '🕊️ Steady does not need to announce itself.',
    '🌱 Quiet steadiness still counts.',
    '🍃 Keeping steady simple.',
    '☕ A steady sip for the afternoon.',
  ],
  Open: [
    '🪟 A little room for the afternoon.',
    '🌤️ Open can be soft, not exposed.',
    '🌼 A small open window for the next stretch.',
    '🍃 Keeping a little space around the day.',
    '✨ A little openness, lightly held.',
  ],
};

/** Optional lines that gently echo the morning's chosen purpose. */
export const MIDDAY_TAILORED_BY_PURPOSE: Record<Purpose, string[]> = {
  Focus: [
    '🪟 One clear next step is plenty.',
    '🌱 Focus, but gently. No clenched jaw required.',
    '✨ A little clarity for the next stretch.',
  ],
  Peace: [
    '🕊️ A small piece of peace can fit here.',
    '🍃 Peace does not need much room. One breath will do.',
    '🌸 A softer edge for the afternoon.',
  ],
  Energy: [
    '☀️ A little clean energy for the next stretch.',
    '🌞 Energy can arrive kindly, not loudly.',
    '🍯 A small golden lift.',
  ],
  'Self-compassion': [
    '🧡 Keep the edges soft.',
    '🌼 A kind note for the part of you still catching up.',
    '🫖 A little warmth, no performance required.',
  ],
  'Letting go': [
    '🍃 One small thing can loosen.',
    '🕊️ Not everything needs carrying into the afternoon.',
    '🌤️ A little more space for the next bit.',
  ],
  Confidence: [
    '🌞 Quiet confidence counts.',
    '☀️ A little backbone, a little softness.',
    '✨ A clean bright note for the next step.',
  ],
  Rest: [
    '🫖 The afternoon can have a softer edge.',
    '🍃 Rest can be a tiny breath, not a full retreat.',
    '🌸 A little softness tucked into the day.',
  ],
  Balance: [
    '🌿 A small adjustment is still balance.',
    '🪟 Balance can begin with a little more room.',
    '☕ A steady middle, gently held.',
  ],
};
