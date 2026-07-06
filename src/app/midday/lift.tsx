import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AmelieOrb } from '@/components/amelie/AmelieOrb';
import { AmelieLine, PrimaryButton, Screen } from '@/components/il/ui';
import { MIDDAY_BOOSTERS, MIDDAY_TAILORED_BY_ENERGY } from '@/content/persona/midday';
import { useRotatingLine } from '@/hooks/useRotatingLine';
import { getCheckIn, todayISODate } from '@/lib/db';
import { ROTATION_KEYS } from '@/lib/storage';

export default function MiddayLift() {
  const router = useRouter();
  // General fallback line (rotates, no repeats within a fortnight).
  const general = useRotatingLine(MIDDAY_BOOSTERS, ROTATION_KEYS.middayBooster);
  const [tailored, setTailored] = useState<string | null>(null);

  // If there's a morning check-in today, gently echo that quality instead.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const ci = await getCheckIn(todayISODate());
        if (!active || !ci) return;
        const pool = MIDDAY_TAILORED_BY_ENERGY[ci.energy] ?? [];
        if (pool.length) setTailored(pool[Math.floor(Math.random() * pool.length)]);
      } catch {
        // No tailoring available — the general line is perfectly good.
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Screen window="midday" contentStyle={{ justifyContent: 'space-between', paddingVertical: 24 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 26 }}>
        <AmelieOrb window="midday" size={128} />
        <AmelieLine style={{ textAlign: 'center', fontSize: 24, lineHeight: 34 }}>
          {tailored ?? general}
        </AmelieLine>
      </View>
      <PrimaryButton label="Back into the day" onPress={() => router.replace('/')} />
    </Screen>
  );
}
