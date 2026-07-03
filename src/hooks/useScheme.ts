import { useColorScheme } from 'react-native';

import { schemeFor, type ColorScheme } from '@/theme/colors';

/** Resolves the active Inner Lotus color scheme (light/dark) from the device setting. */
export function useScheme(): ColorScheme {
  const mode = useColorScheme();
  return schemeFor(mode === 'dark' ? 'dark' : 'light');
}
