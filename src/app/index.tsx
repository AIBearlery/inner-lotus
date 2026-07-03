import { Redirect, useRouter } from 'expo-router';
import { View } from 'react-native';

import { AmelieOrb } from '@/components/amelie/AmelieOrb';
import { AmelieLine, Muted, PrimaryButton, Screen, Title } from '@/components/il/ui';
import { MORNING_OPENERS } from '@/content/persona/morning';
import { useRotatingLine } from '@/hooks/useRotatingLine';
import { useApp } from '@/lib/appState';
import { ROTATION_KEYS } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const { ready, onboardingComplete, profile } = useApp();
  const opener = useRotatingLine(MORNING_OPENERS, ROTATION_KEYS.morningOpener);

  if (!ready) {
    return (
      <Screen window="morning" contentStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <AmelieOrb window="morning" size={120} />
      </Screen>
    );
  }

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  const name = profile?.display_name?.trim();

  return (
    <Screen window="morning">
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 8 }}>
        <View style={{ alignItems: 'center', paddingTop: 24, gap: 20 }}>
          <AmelieOrb window="morning" size={132} />
          <Title style={{ textAlign: 'center' }}>
            {name ? `Morning, ${name}.` : 'Good morning.'}
          </Title>
          <AmelieLine style={{ textAlign: 'center' }}>{opener}</AmelieLine>
        </View>

        <View style={{ gap: 12 }}>
          <PrimaryButton label="Begin your morning" onPress={() => router.push('/morning/check-in')} />
          <Muted style={{ textAlign: 'center' }}>A few gentle minutes, at your pace.</Muted>
        </View>
      </View>
    </Screen>
  );
}
