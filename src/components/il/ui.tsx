// Small shared UI kit for Inner Lotus: a gradient screen, Amelie's "voice" text, selectable
// chips, a primary button, and a soft card. Calm, rounded, generous spacing.

import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useScheme } from '@/hooks/useScheme';
import { gradients } from '@/theme/colors';
import type { DayWindow } from '@/types/domain';

export function Screen({
  window = 'morning',
  children,
  contentStyle,
}: {
  window?: DayWindow;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const mode = useScheme();
  const isDark = mode.background !== gradients.morning.light[0];
  const stops = gradients[window][isDark ? 'dark' : 'light'];
  return (
    <LinearGradient colors={stops as [string, string, ...string[]]} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={[styles.screenContent, contentStyle]}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}

/** Amelie's spoken lines — warmer and softer than UI chrome, so she reads as a person. */
export function AmelieLine({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useScheme();
  return <Text style={[styles.amelie, { color: c.amelieVoice }, style]}>{children}</Text>;
}

export function Title({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useScheme();
  return <Text style={[styles.title, { color: c.ink }, style]}>{children}</Text>;
}

export function Muted({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useScheme();
  return <Text style={[styles.muted, { color: c.muted }, style]}>{children}</Text>;
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const c = useScheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[
        styles.chip,
        { backgroundColor: c.surface, borderColor: selected ? c.primary : c.border },
        selected && { transform: [{ translateY: -2 }] },
      ]}
    >
      <Text style={[styles.chipText, { color: c.ink, fontWeight: selected ? '800' : '600' }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  style,
}: {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const c = useScheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      style={[styles.button, { backgroundColor: c.primary, opacity: disabled ? 0.5 : 1 }, style]}
    >
      {loading ? (
        <ActivityIndicator color={c.onPrimary} />
      ) : (
        <Text style={[styles.buttonText, { color: c.onPrimary }]}>{label}</Text>
      )}
    </Pressable>
  );
}

export function SoftCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const c = useScheme();
  return (
    <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screenContent: { flex: 1, paddingHorizontal: 22, paddingVertical: 16 },
  amelie: { fontSize: 22, lineHeight: 31, fontWeight: '600', letterSpacing: 0.2 },
  title: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.5 },
  muted: { fontSize: 16, lineHeight: 23 },
  chip: {
    borderRadius: 999,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  chipText: { fontSize: 16 },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 54,
  },
  buttonText: { fontSize: 17, fontWeight: '800' },
  card: { borderRadius: 26, borderWidth: 1, padding: 18 },
});
