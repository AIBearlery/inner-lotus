// The explicit "AI seam" for the evening conversation. Today it's rule-based (fixed stage
// script + hand-written pools + a light sentiment heuristic). It's declared async and hidden
// behind AmelieResponseEngine so a future llmResponseEngine (calling a Supabase Edge Function
// that wraps Claude server-side) can replace it with ZERO changes at the call site.

import {
  CLOSING_LINES,
  EVENING_OPENERS,
  GRATITUDE_PROMPTS,
  REFLECTION_ACK_GOOD,
  REFLECTION_ACK_HEAVY,
  REFLECTION_ACK_NEUTRAL,
} from '@/content/persona/evening';
import { pickFresh, recordShown } from '@/engine/rotation';
import { getRecent, ROTATION_KEYS, setRecent } from '@/lib/storage';
import type { ChatMessage, ChatMessageType } from '@/types/domain';

export type ChatStage =
  | 'opener'
  | 'reflection_ack'
  | 'gratitude_prompt'
  | 'gratitude_ack'
  | 'closing'
  | 'done';

export interface AmelieContext {
  stage: ChatStage;
  lastUserReply?: string;
  conversationHistory: ChatMessage[];
}

export interface AmelieMessage {
  text: string;
  messageType: ChatMessageType;
  /** The stage to move to after this message. */
  nextStage: ChatStage;
  /** Whether the app should wait for the user to reply before asking again. */
  awaitReply: boolean;
}

export interface AmelieResponseEngine {
  getNextMessage(ctx: AmelieContext): Promise<AmelieMessage>;
}

/** Lightweight sentiment bucket for choosing an acknowledgment. */
export function classifyReply(reply: string | undefined): 'heavy' | 'good' | 'neutral' {
  const text = (reply ?? '').toLowerCase();
  if (!text.trim()) return 'neutral';

  const heavy = ['tired', 'exhaust', 'hard', 'stress', 'anxious', 'anxiety', 'sad', 'angry',
    'overwhelm', 'cried', 'cry', 'difficult', 'rough', 'struggle', 'worried', 'worry',
    'lonely', 'alone', 'hurt', 'fail', 'awful', 'terrible', 'down', 'drained', 'numb'];
  const good = ['good', 'great', 'happy', 'grateful', 'thankful', 'love', 'loved', 'proud',
    'calm', 'nice', 'wonderful', 'joy', 'peace', 'peaceful', 'relax', 'rested', 'win',
    'excited', 'glad', 'lovely', 'content', 'hopeful', 'fun'];

  if (heavy.some((w) => text.includes(w))) return 'heavy';
  if (good.some((w) => text.includes(w))) return 'good';
  return 'neutral';
}

async function rotate(pool: string[], key: string): Promise<string> {
  const recent = await getRecent(key);
  const pick = pickFresh(pool, recent);
  await setRecent(key, recordShown(pick, recent));
  return pick;
}

async function pickAcknowledgment(reply: string | undefined, positiveBias = false): Promise<string> {
  const mood = positiveBias ? 'good' : classifyReply(reply);
  const pool =
    mood === 'heavy' ? REFLECTION_ACK_HEAVY : mood === 'good' ? REFLECTION_ACK_GOOD : REFLECTION_ACK_NEUTRAL;
  return rotate(pool, `${ROTATION_KEYS.reflectionAck}:${mood}`);
}

export const ruleBasedEngine: AmelieResponseEngine = {
  async getNextMessage(ctx: AmelieContext): Promise<AmelieMessage> {
    switch (ctx.stage) {
      case 'opener':
        return {
          text: await rotate(EVENING_OPENERS, ROTATION_KEYS.eveningOpener),
          messageType: 'reflection_prompt',
          nextStage: 'reflection_ack',
          awaitReply: true,
        };
      case 'reflection_ack':
        return {
          text: await pickAcknowledgment(ctx.lastUserReply),
          messageType: 'acknowledgment',
          nextStage: 'gratitude_prompt',
          awaitReply: false,
        };
      case 'gratitude_prompt':
        return {
          text: await rotate(GRATITUDE_PROMPTS, ROTATION_KEYS.gratitudePrompt),
          messageType: 'gratitude_prompt',
          nextStage: 'gratitude_ack',
          awaitReply: true,
        };
      case 'gratitude_ack':
        return {
          text: await pickAcknowledgment(ctx.lastUserReply, true),
          messageType: 'acknowledgment',
          nextStage: 'closing',
          awaitReply: false,
        };
      case 'closing':
      default:
        return {
          text: await rotate(CLOSING_LINES, ROTATION_KEYS.closingLine),
          messageType: 'acknowledgment',
          nextStage: 'done',
          awaitReply: false,
        };
    }
  },
};
