import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from '@/lib/appState';
import { SessionProvider } from '@/lib/auth';
import { configureAudioModeForPlayback } from '@/lib/audio';
import { configureNotificationHandler } from '@/lib/notifications';

SplashScreen.preventAutoHideAsync();
configureNotificationHandler();

export default function RootLayout() {
  useEffect(() => {
    configureAudioModeForPlayback();
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <AppProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'fade',
            }}
          />
        </AppProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
