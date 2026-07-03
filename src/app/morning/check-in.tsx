import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AmelieLine, Chip, Muted, PrimaryButton, Screen, Title } from '@/components/il/ui';
import {
  ENERGY_OPTIONS,
  MORNING_ENERGY_PROMPTS,
  MORNING_PURPOSE_PROMPTS,
  PURPOSE_OPTIONS,
} from '@/content/persona/morning';
import { getRecommendedMeditation } from '@/content/recommendation';
import { useRotatingLine } from '@/hooks/useRotatingLine';
import { useApp } from '@/lib/appState';
import { saveCheckIn, todayISODate } from '@/lib/db';
import { ROTATION_KEYS } from '@/lib/storage';
import type { Energy, Purpose } from '@/types/domain';

export default function CheckIn() {
  const router = useRouter();
  const { userId } = useApp();
  const energyPrompt = useRotatingLine(MORNING_ENERGY_PROMPTS, ROTATION_KEYS.morningEnergyPrompt);
  const purposePrompt = useRotatingLine(MORNING_PURPOSE_PROMPTS, ROTATION_KEYS.morningPurposePrompt);

  const [step, setStep] = useState<'energy' | 'purpose'>('energy');
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [saving, setSaving] = useState(false);

  async function begin() {
    if (!energy || !purpose) return;
    setSaving(true);

    const meditation = getRecommendedMeditation(energy, purpose);
    let checkInId: string | undefined;
    try {
      if (userId) {
        const saved = await saveCheckIn({
          user_id: userId,
          date: todayISODate(),
          energy,
          purpose,
        });
        checkInId = saved.id;
      }
    } catch {
      // A failed save shouldn't block the practice; completion will try again later.
    } finally {
      setSaving(false);
    }

    router.push({
      pathname: '/morning/session',
      params: { meditationId: meditation.id, checkInId: checkInId ?? '' },
    });
  }

  return (
    <Screen window="morning">
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
        {step === 'energy' ? (
          <>
            <View style={{ paddingTop: 28, gap: 8 }}>
              <Muted>Step 1 of 2</Muted>
              <Title>{energyPrompt}</Title>
              <AmelieLine>Not how you are — how you’d like to be.</AmelieLine>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {ENERGY_OPTIONS.map((e) => (
                <Chip key={e} label={e} selected={energy === e} onPress={() => setEnergy(e)} />
              ))}
            </View>
            <PrimaryButton label="Next" disabled={!energy} onPress={() => setStep('purpose')} />
          </>
        ) : (
          <>
            <View style={{ paddingTop: 28, gap: 8 }}>
              <Muted>Step 2 of 2</Muted>
              <Title>{purposePrompt}</Title>
              <AmelieLine>You’re inviting in {energy?.toLowerCase()}. What would help it grow?</AmelieLine>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {PURPOSE_OPTIONS.map((p) => (
                <Chip key={p} label={p} selected={purpose === p} onPress={() => setPurpose(p)} />
              ))}
            </View>
            <PrimaryButton
              label="Find my practice"
              disabled={!purpose}
              loading={saving}
              onPress={begin}
            />
          </>
        )}
      </View>
    </Screen>
  );
}
