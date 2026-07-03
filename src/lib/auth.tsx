import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { isSupabaseConfigured, supabase } from './supabase';

type SessionState = {
  session: Session | null;
  userId: string | null;
  /** True while we're still figuring out / creating the first session. */
  loading: boolean;
  /**
   * Set when we could not establish a session. The most common cause is that
   * "Anonymous sign-ins" is still turned off in the Supabase dashboard.
   */
  error: string | null;
};

const SessionContext = createContext<SessionState>({
  session: null,
  userId: null,
  loading: true,
  error: null,
});

/**
 * Wraps the app. On first launch it creates an anonymous Supabase user (no email or
 * password), which gives a stable `auth.uid()` for Row Level Security. On later
 * launches the persisted session is restored from AsyncStorage.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Guards against kicking off a second anonymous sign-in while one is in flight.
  const signingInRef = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_* to .env.local.');
      setLoading(false);
      return;
    }

    let active = true;

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (data.session) {
        setSession(data.session);
        setLoading(false);
        return;
      }

      if (signingInRef.current) return;
      signingInRef.current = true;
      const { data: signInData, error: signInError } = await supabase.auth.signInAnonymously();
      if (!active) return;

      if (signInError) {
        setError(
          signInError.message ||
            'Could not start an anonymous session. Enable "Anonymous sign-ins" in Supabase.',
        );
      } else {
        setSession(signInData.session);
      }
      signingInRef.current = false;
      setLoading(false);
    }

    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    // Supabase recommends only auto-refreshing the token while the app is foregrounded.
    const onAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };
    const appStateSub = AppState.addEventListener('change', onAppStateChange);
    if (AppState.currentState === 'active') {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
      appStateSub.remove();
    };
  }, []);

  const value = useMemo<SessionState>(
    () => ({ session, userId: session?.user?.id ?? null, loading, error }),
    [session, loading, error],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
