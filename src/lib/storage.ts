// Thin AsyncStorage wrapper for EPHEMERAL UI state only — rotation history, the
// onboarding-complete flag, and nudge pacing. Durable journal data (check-ins, chat,
// completions, profile) lives in Supabase, never here.

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'il:';
const key = (name: string) => `${PREFIX}${name}`;

// Keys for each rotating copy pool's recent-shown history.
export const ROTATION_KEYS = {
  morningGreeting: 'rot:morningGreeting',
  morningOpener: 'rot:morningOpener',
  morningEnergyPrompt: 'rot:morningEnergyPrompt',
  morningPurposePrompt: 'rot:morningPurposePrompt',
  morningNudge: 'rot:morningNudge',
  middayBooster: 'rot:middayBooster',
  eveningGreeting: 'rot:eveningGreeting',
  eveningOpener: 'rot:eveningOpener',
  reflectionAck: 'rot:reflectionAck',
  gratitudePrompt: 'rot:gratitudePrompt',
  closingLine: 'rot:closingLine',
} as const;

export async function getRecent(rotationKey: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(key(rotationKey));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export async function setRecent(rotationKey: string, recent: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key(rotationKey), JSON.stringify(recent));
  } catch {
    // Rotation history is best-effort; a failed write just risks an earlier repeat.
  }
}

const ONBOARDING_COMPLETE = 'onboardingComplete';

export async function isOnboardingComplete(): Promise<boolean> {
  return (await AsyncStorage.getItem(key(ONBOARDING_COMPLETE))) === 'true';
}

export async function setOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(key(ONBOARDING_COMPLETE), 'true');
}

const LAST_NUDGE_AT = 'lastNudgeAt';

export async function getLastNudgeAt(): Promise<string | null> {
  return AsyncStorage.getItem(key(LAST_NUDGE_AT));
}

export async function setLastNudgeAt(iso: string): Promise<void> {
  await AsyncStorage.setItem(key(LAST_NUDGE_AT), iso);
}
