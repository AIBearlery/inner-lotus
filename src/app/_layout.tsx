import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from '@/lib/appState';
import { SessionProvider } from '@/lib/auth';
import { configureAudioModeForPlayback } from '@/lib/audio';
import { configureNotificationHandler } from '@/lib/notifications';

SplashScreen.preventAutoHideAsync();
configureNotificationHandler();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    configureAudioModeForPlayback();
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <AppProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
                animation: 'fade',
              }}
            />
          </ThemeProvider>
        </AppProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
