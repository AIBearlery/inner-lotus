// Core domain vocabulary for Inner Lotus. Kept free of any runtime logic so it can be
// imported anywhere (content, engines, screens, db) without side effects.

/** Step 1 of the morning check-in: the energy the user wants to invite in. */
export type Energy =
  | 'Calm'
  | 'Bright'
  | 'Grounded'
  | 'Light'
  | 'Focused'
  | 'Warm'
  | 'Steady'
  | 'Open';

/** Step 2 of the morning check-in: the purpose / what would help today. */
export type Purpose =
  | 'Focus'
  | 'Peace'
  | 'Energy'
  | 'Self-compassion'
  | 'Letting go'
  | 'Confidence'
  | 'Rest'
  | 'Balance';

/** The three daily touchpoints. */
export type DayWindow = 'morning' | 'midday' | 'evening';

/**
 * A morning meditation. Each one shows a short on-screen "seed" (a zen quote or
 * mini-story, read with eyes open) and then plays AUDIO guidance so the user can
 * close their eyes. Body-scan/release is deliberately reserved for the evening.
 */
export type Meditation = {
  id: string;
  title: string;
  /** Which check-in picks this session is a good match for. */
  serves: { energies: Energy[]; needs: Purpose[] };
  /** The brief text shown before the audio begins. */
  seed: { kind: 'zen_quote' | 'mini_story'; text: string; attribution?: string };
  /** Eyes-closed guided narration. assetId maps to a bundled/remote audio source. */
  audio: { assetId: string; durationSec: number };
  lengthMin: number;
};

// --- Database row shapes (mirror supabase/migrations/0001_init.sql) ---

export type Profile = {
  id: string;
  display_name: string | null;
  timezone: string | null;
  morning_enabled: boolean;
  midday_enabled: boolean;
  evening_enabled: boolean;
  created_at: string;
};

export type CheckIn = {
  id: string;
  user_id: string;
  date: string;
  energy: Energy;
  purpose: Purpose;
  created_at: string;
};

export type ChatRole = 'amelie' | 'user';

export type ChatMessageType =
  | 'reflection_prompt'
  | 'reflection_reply'
  | 'gratitude_prompt'
  | 'gratitude_reply'
  | 'acknowledgment';

export type ChatMessage = {
  id: string;
  session_id: string;
  user_id: string;
  role: ChatRole;
  message_type: ChatMessageType;
  content: string;
  sort_order: number;
  created_at: string;
};
