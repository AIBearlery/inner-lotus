import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AmelieOrb } from '@/components/amelie/AmelieOrb';
import { AmelieLine, PrimaryButton, Screen, Title } from '@/components/il/ui';
import { EVENING_WINDDOWN } from '@/content/meditations';

export default function EveningIndex() {
  const router = useRouter();

  return (
    <Screen window="evening">
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
        <View style={{ alignItems: 'center', paddingTop: 28, gap: 20 }}>
          <AmelieOrb window="evening" size={132} />
          <Title style={{ textAlign: 'center' }}>Evening.</Title>
          <AmelieLine style={{ textAlign: 'center' }}>
            Let’s close the day gently. We can settle with a slow wind-down first, or go straight
            to a little talking — whichever suits you tonight.
          </AmelieLine>
        </View>

        <View style={{ gap: 12 }}>
          <PrimaryButton label="Let’s talk a little" onPress={() => router.push('/evening/chat')} />
          <PrimaryButton
            label="Settle first — a quiet wind-down"
            variant="ghost"
            onPress={() =>
              router.push({
                pathname: '/morning/session',
                params: { meditationId: EVENING_WINDDOWN.id, window: 'evening' },
              })
            }
          />
        </View>
      </View>
    </Screen>
  );
}
