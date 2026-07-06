// Amelie's EVENING register — LOCKED v1 copy. Soft, unhurried, close but not clingy;
// reflective without analysing; gratitude folded in naturally; no fixing, no advice, no
// guilt. More conversational than quote-like.
//
// Tone AVOID list (keep out of any evening UI text too): "I'm here beside you",
// "tell me everything", "you made it", "let it all go", "safe space", "hard day?".

/** Push notification — the soft evening invitation to slow down. */
export const EVENING_GREETING_NOTIFICATIONS: string[] = [
  '🌙 Evening’s here. Let’s slow things down a little.',
  '🫖 Got a quiet minute? We can keep it simple.',
  '✨ The day can loosen now. No rush.',
  '🕯️ Come take a small evening pause.',
  '🍃 Let’s give the day a gentler finish.',
  '🌸 Come sit with the evening for a minute.',
  '🧡 A warm little note for the end of the day.',
  '🪟 The light’s lower now. Let’s take it softly.',
  '🕊️ A calm minute for the evening, if it fits.',
  '🌌 The day’s settling. We can too.',
  '☁️ A little quiet for the last stretch.',
  '🌿 Nothing to sort tonight. Just a small pause.',
  '🫧 The evening has room for one easy breath.',
  '🌙 Let’s close the day gently.',
  '🪷 Here’s a small place to land.',
  '🫖 One warm minute before the day fades out.',
  '✨ Let’s keep the evening simple.',
  '🌸 A quiet ending, kept light.',
  '🍃 The day can sit down now.',
  '🕯️ A soft pause, if you want one.',
];

/** The ice-breaker that opens the evening chat. */
export const EVENING_OPENERS: string[] = [
  '🌙 Let’s close the day gently.',
  '🫖 We can keep this very simple.',
  '✨ What’s still hanging around from today?',
  '🍃 Let’s take the evening one small bit at a time.',
  '🌸 A little look back, no heavy lifting.',
  '🕯️ Anything you’d like to set down from today?',
  '🧡 Let’s give the day a kind ending.',
  '🪟 What part of today is still nearby?',
  '🕊️ We can start with one easy breath.',
  '🌌 The day doesn’t need a verdict.',
  '☁️ Let’s make the evening a little quieter.',
  '🌿 Nothing needs fixing here.',
  '🫧 Anything that wants a little room before sleep?',
  '🌙 Let’s let the day become evening.',
  '🪷 We’ll land this gently.',
  '🫖 Tell me one piece of today.',
  '✨ We can begin with whatever comes first.',
  '🌸 Just a gentle look back. Nothing more.',
  '🍃 Anything you’d like to loosen a little?',
  '🕯️ Let’s end the day without wrestling it.',
];

/** Asked within the same conversation — one good thing from the day. */
export const GRATITUDE_PROMPTS: string[] = [
  '🌸 Was there one small good thing today?',
  '🫖 What felt warm, even for a moment?',
  '✨ What’s one thing worth keeping from today?',
  '🍃 Was there a moment that felt a little lighter?',
  '🧡 What gave the day a softer edge?',
  '🌙 Anything we can thank today for, gently?',
  '🕯️ What tiny thing deserves a little nod?',
  '🪟 Was there a moment with a bit of light in it?',
  '🌿 What helped, even a little?',
  '🕊️ Did anything feel peaceful, even briefly?',
  '☁️ What was quietly okay today?',
  '🫧 What small thing would be nice to remember?',
  '🌌 Did today give you anything small and good?',
  '🌼 What brought even the smallest smile?',
  '🍯 What was sweeter than expected?',
  '🫖 Was there a warm little moment in the day?',
  '✨ What little good thing can come with us?',
  '🌸 What deserves a soft thank-you?',
  '🍃 Did anything make the day feel a little easier?',
  '🧡 Where did kindness show up today?',
];

/** A warm good-night to end on. */
export const CLOSING_LINES: string[] = [
  '🌙 That’s enough for tonight. Softly done.',
  '🫖 Let the rest of the day fade gently.',
  '✨ Hope the night is kind around the edges.',
  '🍃 Nothing more needed now.',
  '🌸 Let the evening hold the last little pieces.',
  '🕯️ A quiet close, and then rest.',
  '🧡 Hope sleep arrives gently.',
  '🪟 The day can stay outside the room now.',
  '🕊️ Rest easy, one breath at a time.',
  '🌌 Let the night be wide and quiet.',
  '☁️ No need to carry the whole day into bed.',
  '🌿 A soft ending is enough.',
  '🫧 Let things be simple now.',
  '🌙 Good night. Hope tomorrow opens gently.',
  '🪷 Leave the day here for now.',
  '🫖 Warm ending, quiet night.',
  '✨ You can close the day softly.',
  '🌸 A little peace for the night.',
  '🍃 Let the last breath be easy.',
  '🕯️ Sleep gently, when it comes.',
];

// --- Acknowledgments, grouped by the mood of the user's reply (chosen by the engine). ---

/** For a heavy / hard / tender reply — gentle, holding, no fixing. */
export const REFLECTION_ACK_HEAVY: string[] = [
  '🕯️ That sounds like a lot.',
  '🧡 I’m glad you said it.',
  '🌙 Let’s hold that gently tonight.',
  '🍃 No need to solve it right now.',
  '🫖 That deserves a softer ending.',
  '🕊️ That was a heavy part of the day.',
  '☁️ I can see why that would feel heavy.',
  '🌸 We can leave it there for now.',
  '🌿 Thank you for putting words to it.',
  '✨ Saying it simply is enough.',
];

/** For a good / light day — warm, glad-with-you. */
export const REFLECTION_ACK_GOOD: string[] = [
  '🌼 That sounds lovely.',
  '✨ I like that for you.',
  '🧡 That feels worth keeping.',
  '☀️ A good little spark.',
  '🍯 That’s a sweet one.',
  '🌸 Let’s keep that near tonight.',
  '🫖 That’s a warm thing to end on.',
  '🕊️ That sounds quietly good.',
  '🌿 A nice piece of today.',
  '🌙 That can come gently into the night.',
];

/** For a neutral / tired / unsure reply — soft, accepting. */
export const REFLECTION_ACK_NEUTRAL: string[] = [
  '🫖 That’s allowed to be simple.',
  '🌙 Some days are just a day.',
  '🍃 We can leave it there for now.',
  '☁️ No need to make it more than it is.',
  '🌸 Simple counts.',
  '🕯️ A quiet answer is still an answer.',
  '🌿 That can be enough for tonight.',
  '🫧 We can keep it light.',
  '✨ A small note, softly placed.',
  '🧡 No need to dress it up.',
];
