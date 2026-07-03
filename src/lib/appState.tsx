// App-level state above the session: whether onboarding is done and the user's profile.
// Onboarding status is read from the local flag (AsyncStorage) so a returning user gets in
// even if the network is briefly unavailable; the profile is loaded from Supabase for display.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { useSession } from '@/lib/auth';
import { getProfile, upsertProfile, type ProfileUpsert } from '@/lib/db';
import { isOnboardingComplete, setOnboardingComplete } from '@/lib/storage';
import type { Profile } from '@/types/domain';

type AppState = {
  ready: boolean;
  onboardingComplete: boolean;
  profile: Profile | null;
  userId: string | null;
  completeOnboarding: (data: Omit<ProfileUpsert, 'id'>) => Promise<void>;
  refresh: () => Promise<void>;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { userId, loading: sessionLoading } = useSession();
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const load = useCallback(async () => {
    const done = await isOnboardingComplete();
    setOnboarded(done);
    if (userId) {
      try {
        setProfile(await getProfile(userId));
      } catch {
        // Profile fetch can fail offline; the local onboarding flag still governs routing.
      }
    }
    setReady(true);
  }, [userId]);

  useEffect(() => {
    if (sessionLoading) return;
    load();
  }, [sessionLoading, load]);

  const completeOnboarding = useCallback(
    async (data: Omit<ProfileUpsert, 'id'>) => {
      if (!userId) throw new Error('No session yet.');
      const saved = await upsertProfile({ id: userId, ...data });
      await setOnboardingComplete();
      setProfile(saved);
      setOnboarded(true);
    },
    [userId],
  );

  const value = useMemo<AppState>(
    () => ({
      ready: ready && !sessionLoading,
      onboardingComplete: onboarded,
      profile,
      userId,
      completeOnboarding,
      refresh: load,
    }),
    [ready, sessionLoading, onboarded, profile, userId, completeOnboarding, load],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
