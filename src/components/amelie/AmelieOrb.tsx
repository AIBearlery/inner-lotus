// Amelie's visual mark: a soft, WARM, grounded orb that gently "breathes" (a slow scale +
// glow), tuned per time-of-day. Deliberately NOT spirit-y — warm daylight tones, a settled
// breathing motion (not drifting/flickering), soft but solid. This matters for anxious or
// panic-prone users, so keep it calm and lantern-like, never spectral.

import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type ViewStyle } from 'react-native';

import type { DayWindow } from '@/types/domain';

type OrbPalette = { core: string; mid: string; halo: string };

// Warm, sunlit palettes per window — gold-ish morning, brighter midday, soft rose evening.
const ORB_PALETTES: Record<DayWindow, OrbPalette> = {
  morning: { core: '#FFE9A8', mid: '#F8C98B', halo: 'rgba(248, 184, 139, 0.45)' },
  midday: { core: '#FFF0C4', mid: '#FAD79A', halo: 'rgba(246, 211, 107, 0.45)' },
  evening: { core: '#E7C7DC', mid: '#CDBEEB', halo: 'rgba(155, 138, 190, 0.40)' },
};

export function AmelieOrb({
  window = 'morning',
  size = 140,
  breathing = true,
  style,
}: {
  window?: DayWindow;
  size?: number;
  breathing?: boolean;
  style?: ViewStyle;
}) {
  const palette = ORB_PALETTES[window];
  const breath = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!breathing) return;
    // ~9s full cycle: a calm, human resting-breath pace (never fast or flickery).
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, {
          toValue: 1,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breath, {
          toValue: 0,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breath, breathing]);

  const scale = breath.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.04] });
  const haloOpacity = breath.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.85] });

  const dims = useMemo(
    () => ({
      halo: { width: size * 1.5, height: size * 1.5, borderRadius: size * 0.75 },
      mid: { width: size * 1.12, height: size * 1.12, borderRadius: size * 0.56 },
      core: { width: size, height: size, borderRadius: size / 2 },
    }),
    [size],
  );

  return (
    <View style={[styles.wrap, { width: size * 1.5, height: size * 1.5 }, style]}>
      <Animated.View
        style={[
          styles.layer,
          dims.halo,
          { backgroundColor: palette.halo, opacity: haloOpacity, transform: [{ scale }] },
        ]}
      />
      <Animated.View
        style={[styles.layer, dims.mid, { backgroundColor: palette.mid, transform: [{ scale }] }]}
      />
      <Animated.View
        style={[styles.layer, dims.core, { backgroundColor: palette.core, transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  layer: { position: 'absolute' },
});
