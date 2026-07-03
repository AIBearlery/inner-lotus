// supabase-js needs the WHATWG URL API, which React Native lacks natively.
// This polyfill must be imported before the client is created.
import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

/**
 * True only when both env vars are present. Screens can use this to show a gentle
 * "not configured yet" state instead of crashing when `.env.local` is missing.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // Persist the (anonymous) session on-device so the same user is restored on reopen.
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // No deep-link session detection on native; only relevant on web OAuth redirects.
    detectSessionInUrl: false,
  },
});
