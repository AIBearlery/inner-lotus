// Amelie's EVENING register: softer, slower, tender — listening more than talking, like
// texting a close friend to unwind. Companion tone ("we", "I'm here"), never a form or a
// therapist. Gratitude is folded into the same conversation.
//
// PLACEHOLDER COPY: these are working lines so the evening flow functions and rotates. They
// are meant to be refined via docs/amelie-voice-handover.md. Flat arrays, zero logic; each
// rotating pool has >=14 entries (two-week no-repeat), acknowledgments grouped by mood.

/** Push notification — the soft evening "come sit with me a minute." */
export const EVENING_GREETING_NOTIFICATIONS: string[] = [
  'Evening, you. Come sit with me a minute?',
  'The day’s winding down. Let’s let it, together.',
  'I’m here whenever you want to set the day down.',
  'Thinking of you tonight. No agenda — just company.',
  'Come find me when you’re ready to exhale.',
  'Let’s close the day gently, you and me.',
  'A soft minute before sleep? I saved you a seat.',
  'However today went, I’m glad it’s bringing you back here.',
  'Evening. Let’s put the day down somewhere safe.',
  'I’m around, if you’d like to talk it out a little.',
  'The quiet part of the day is here. Join me?',
  'No need to be okay. Just come as you are.',
  'Let’s breathe out the day together.',
  'Here when you are — nothing this evening but us.',
  'Wind-down time. I kept the light on for you.',
  'Come tell me one thing about today, if you like.',
];

/** The ice-breaker that opens the evening chat and invites them to share. */
export const EVENING_OPENERS: string[] = [
  'Hey. So — how did today treat you, really?',
  'Come sit. What’s sitting with you tonight?',
  'Tell me one thing the day left you with.',
  'How are you, honestly? I’ve got time.',
  'What’s on your mind as the day closes?',
  'Let’s set it down together. What was today like?',
  'No filter needed here. How was it?',
  'What’s the feeling you’re carrying into tonight?',
  'I’m all ears. How did it go?',
  'What stayed with you from today?',
  'Where did your head go most today?',
  'How’s your heart this evening?',
  'What do you want to leave here before bed?',
  'Talk to me — what kind of day was it?',
  'If today had a weather, what was it?',
  'What’s the one thing you’d tell a close friend about today?',
];

/** Asked within the same conversation — one good thing from the day. */
export const GRATITUDE_PROMPTS: string[] = [
  'Before we close — what’s one good thing from today?',
  'Give me one small bright spot, however tiny.',
  'What’s one thing you’re glad happened today?',
  'One good thing — even a cup of tea counts.',
  'What softened today, even a little?',
  'Name one thing that went right, however small.',
  'What’s one moment you’d keep from today?',
  'Anything today that made you exhale? Tell me.',
  'One small mercy from the day — what was it?',
  'What’s a tiny thing you’re thankful for right now?',
  'Where was the light today, even a flicker?',
  'One kindness — yours or someone else’s — from today?',
  'What’s one thing that helped, even slightly?',
  'Before sleep, one good thing. What comes to mind?',
];

/** A warm good-night to end on. */
export const CLOSING_LINES: string[] = [
  'Thank you for sitting with me. Rest well, okay?',
  'That’s enough for today. We did it — good night.',
  'You showed up for yourself tonight. Sleep gently.',
  'The day’s done, and you’re still here. Proud of us.',
  'Let it all go soft now. I’ll be here in the morning.',
  'Rest easy. Tomorrow, we begin again — together.',
  'You can put it all down now. Good night, you.',
  'Nothing left to carry tonight. Sleep well.',
  'Thank you for today. Be gentle with yourself as you drift off.',
  'We closed the day kindly. That’s plenty. Good night.',
  'Sleep when you’re ready — I’m not going anywhere.',
  'That was a good sit. Rest now, friend.',
  'Let tonight be soft. See you at first light.',
  'You’re allowed to rest now. Good night.',
];

// --- Acknowledgments, grouped by the mood of the user's reply (chosen by the engine). ---

/** For a heavy / hard / tender reply — gentle, holding, no fixing. */
export const REFLECTION_ACK_HEAVY: string[] = [
  'That sounds like it took something out of you. Thank you for setting it here.',
  'Oof. I’m glad you don’t have to hold that alone right now.',
  'That’s a lot. You don’t have to tidy it up — just let it be here with us.',
  'I hear you. That kind of day asks a lot of a person.',
  'No wonder you’re tired. That was heavy to carry.',
  'Thank you for trusting me with the hard part. I’m right here.',
  'You made it through, even so. That counts for something.',
  'Let’s just breathe with it for a second. You’re not alone in it.',
];

/** For a good / light / warm reply — glad-with-you. */
export const REFLECTION_ACK_GOOD: string[] = [
  'Oh, I love that. Let’s let it linger a moment.',
  'That’s lovely to hear — I’m genuinely glad.',
  'Good. Really good. Hold onto that one.',
  'That’s the kind of day worth remembering. Thank you for sharing it.',
  'Look at that — something went right. I’m smiling with you.',
  'Yes. Let that settle in properly before you sleep.',
  'That warms me too. What a nice thing to carry into the night.',
  'Beautiful. I’m glad today gave you that.',
];

/** For a short / tired / neutral / unsure reply — soft, accepting. */
export const REFLECTION_ACK_NEUTRAL: string[] = [
  'That’s okay too. Not every day needs a headline.',
  'Mm. Some days just are. Thanks for telling me.',
  'Fair enough. We don’t have to make it into anything.',
  'Noted, and held. However it was, you’re here now.',
  'A quiet kind of day. That’s allowed.',
  'Okay. Let’s just be here for a moment, no pressure.',
  'Thank you. Even a few words is enough tonight.',
  'Got it. Let’s ease toward rest, then.',
];
