// Typed Supabase reads/writes for durable journal data. Every call is implicitly scoped to
// the current anonymous user by Row Level Security, so we never filter by user_id on reads.

import { supabase } from '@/lib/supabase';
import type {
  ChatMessage,
  ChatMessageType,
  ChatRole,
  CheckIn,
  Energy,
  Profile,
  Purpose,
} from '@/types/domain';

/** Local calendar date as YYYY-MM-DD (the app keys a day by the user's local date). */
export function todayISODate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export type ProfileUpsert = {
  id: string;
  display_name?: string | null;
  timezone?: string | null;
  morning_enabled?: boolean;
  midday_enabled?: boolean;
  evening_enabled?: boolean;
};

export async function upsertProfile(profile: ProfileUpsert): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function getCheckIn(date: string): Promise<CheckIn | null> {
  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .eq('date', date)
    .maybeSingle();
  if (error) throw error;
  return data as CheckIn | null;
}

export async function saveCheckIn(input: {
  user_id: string;
  date: string;
  energy: Energy;
  purpose: Purpose;
}): Promise<CheckIn> {
  const { data, error } = await supabase
    .from('check_ins')
    .upsert(input, { onConflict: 'user_id,date' })
    .select()
    .single();
  if (error) throw error;
  return data as CheckIn;
}

export async function saveMeditationCompletion(input: {
  user_id: string;
  meditation_id: string;
  check_in_id?: string | null;
  duration_listened_sec?: number | null;
}): Promise<void> {
  const { error } = await supabase.from('meditation_completions').insert(input);
  if (error) throw error;
}

/** Total lifetime check-ins — feeds the nudge engine's "never on day 1" rule. */
export async function countCheckIns(): Promise<number> {
  const { count, error } = await supabase
    .from('check_ins')
    .select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}

// --- Evening chat ---

export type ChatSession = {
  id: string;
  user_id: string;
  date: string;
  kind: string;
  started_at: string;
  completed_at: string | null;
};

export async function getOrCreateChatSession(
  userId: string,
  date: string,
  kind = 'evening',
): Promise<ChatSession> {
  const { data, error } = await supabase
    .from('chat_sessions')
    .upsert({ user_id: userId, date, kind }, { onConflict: 'user_id,date,kind' })
    .select()
    .single();
  if (error) throw error;
  return data as ChatSession;
}

export async function completeChatSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('chat_sessions')
    .update({ completed_at: new Date().toISOString() })
    .eq('id', sessionId);
  if (error) throw error;
}

export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as ChatMessage[];
}

export async function deleteChatMessages(sessionId: string): Promise<void> {
  const { error } = await supabase.from('chat_messages').delete().eq('session_id', sessionId);
  if (error) throw error;
}

export async function saveChatMessage(input: {
  session_id: string;
  user_id: string;
  role: ChatRole;
  message_type: ChatMessageType;
  content: string;
  sort_order: number;
}): Promise<void> {
  const { error } = await supabase.from('chat_messages').insert(input);
  if (error) throw error;
}

// --- History ---

export async function getRecentCheckIns(limit = 30): Promise<CheckIn[]> {
  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as CheckIn[];
}

/** Gratitude entries are just chat_messages of type gratitude_reply. */
export async function getGratitudeEntries(limit = 30): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('message_type', 'gratitude_reply')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ChatMessage[];
}
