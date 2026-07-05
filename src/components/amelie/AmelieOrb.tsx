// Amelie's visual mark: a soft, WARM, grounded orb that gently "breathes" and slowly
// RADIATES — rings of warm light easing outward like early sun rays, to carry morning
// energy without ever being bright or harsh. Deliberately NOT spirit-y: warm daylight tones,
// a calm resting-breath pace, soft but solid. This matters for anxious / panic-prone users.

import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, type ViewStyle } from 'react-native';

import type { DayWindow } from '@/types/domain';

type OrbPalette = { core: string; mid: string; halo: string };

// Warm, sunlit palettes per window — gold-ish morning, brighter midday, soft rose evening.
const ORB_PALETTES: Record<DayWindow, OrbPalette> = {
  morning: { core: '#FFE9A8', mid: '#F8C98B', halo: 'rgba(248, 184, 139, 0.55)' },
  midday: { core: '#FFF0C4', mid: '#FAD79A', halo: 'rgba(246, 211, 107, 0.55)' },
  evening: { core: '#E7C7DC', mid: '#CDBEEB', halo: 'rgba(176, 156, 214, 0.50)' },
};

const RAY_COUNT = 3;

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
  const rays = useRef(Array.from({ length: RAY_COUNT }, () => new Animated.Value(0))).current;

  // Breathing core (~9s calm resting-breath cycle).
  useEffect(() => {
    if (!breathing) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, { toValue: 1, duration: 4500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breath, { toValue: 0, duration: 4500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breath, breathing]);

  // Radiating rays: each grows outward and fades, staggered so they ripple continuously.
  useEffect(() => {
    if (!breathing) return;
    const period = 5600;
    const anims = rays.map((v, i) =>
      Animated.sequence([
        Animated.delay((period / RAY_COUNT) * i),
        Animated.loop(
          Animated.timing(v, {
            toValue: 1,
            duration: period,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ),
      ]),
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [rays, breathing]);

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

  const wrap = size * 2.3;

  return (
    <View style={[styles.wrap, { width: wrap, height: wrap }, style]}>
      {rays.map((v, i) => {
        const rayScale = v.interpolate({ inputRange: [0, 1], outputRange: [0.75, 2.1] });
        const rayOpacity = v.interpolate({ inputRange: [0, 0.18, 1], outputRange: [0, 0.3, 0] });
        return (
          <Animated.View
            key={i}
            style={[
              styles.layer,
              dims.core,
              { backgroundColor: palette.halo, opacity: rayOpacity, transform: [{ scale: rayScale }] },
            ]}
          />
        );
      })}

      <Animated.View
        style={[styles.layer, dims.halo, { backgroundColor: palette.halo, opacity: haloOpacity, transform: [{ scale }] }]}
      />
      <Animated.View style={[styles.layer, dims.mid, { backgroundColor: palette.mid, transform: [{ scale }] }]} />
      <Animated.View style={[styles.layer, dims.core, { backgroundColor: palette.core, transform: [{ scale }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  layer: { position: 'absolute' },
});
