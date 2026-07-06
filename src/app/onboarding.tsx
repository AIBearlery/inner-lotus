import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Switch, TextInput, View } from 'react-native';

import { AmelieOrb } from '@/components/amelie/AmelieOrb';
import { AmelieLine, Muted, PrimaryButton, Screen, SoftCard, Title } from '@/components/il/ui';
import { useScheme } from '@/hooks/useScheme';
import { useApp } from '@/lib/appState';
import { rescheduleFromProfile, requestNotificationPermissions } from '@/lib/notifications';

type Step = 'welcome' | 'name' | 'windows' | 'notify';

export default function Onboarding() {
  const router = useRouter();
  const c = useScheme();
  const { completeOnboarding } = useApp();

  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [windows, setWindows] = useState({ morning: true, midday: true, evening: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function finish() {
    setSaving(true);
    setError(null);
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
      await completeOnboarding({
        display_name: name.trim() || null,
        timezone,
        morning_enabled: windows.morning,
        midday_enabled: windows.midday,
        evening_enabled: windows.evening,
      });

      // Ask for permission, then lay down the schedule for every enabled window.
      const granted = await requestNotificationPermissions();
      if (granted) {
        await rescheduleFromProfile({
          morning_enabled: windows.morning,
          midday_enabled: windows.midday,
          evening_enabled: windows.evening,
        });
      }
      router.replace('/');
    } catch {
      setError('Hmm, I couldn’t save that just now. Mind trying again in a moment?');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen window="morning">
      {step === 'welcome' && (
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
          <View style={{ alignItems: 'center', paddingTop: 32, gap: 22 }}>
            <AmelieOrb window="morning" size={140} />
            <Title style={{ textAlign: 'center' }}>Hello — I’m Amelie.</Title>
            <AmelieLine style={{ textAlign: 'center' }}>
              I’m your companion through the day — a bright little start each morning, and a
              soft place to land at night. No streaks, no pressure. We’ll just keep each other
              good company.
            </AmelieLine>
          </View>
          <PrimaryButton label="Nice to meet you" onPress={() => setStep('name')} />
        </View>
      )}

      {step === 'name' && (
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
          <View style={{ paddingTop: 40, gap: 18 }}>
            <Title>What should I call you?</Title>
            <AmelieLine>Just a first name, or a nickname — whatever feels like you.</AmelieLine>
            <SoftCard>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={c.muted}
                autoFocus
                autoCapitalize="words"
                returnKeyType="done"
                onSubmitEditing={() => setStep('windows')}
                style={{ fontSize: 20, color: c.ink, paddingVertical: 6 }}
              />
            </SoftCard>
          </View>
          <PrimaryButton label="Continue" onPress={() => setStep('windows')} />
        </View>
      )}

      {step === 'windows' && (
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
          <View style={{ paddingTop: 32, gap: 16 }}>
            <Title>When shall I check in?</Title>
            <AmelieLine>
              Pick the moments you’d like me around. I’ll arrive at a gentle, unfixed time —
              like a friend who just thought of you. You can change these anytime.
            </AmelieLine>
            <WindowToggle
              label="Morning"
              hint="A calm, energising start · 7:30–9:00"
              value={windows.morning}
              onChange={(v) => setWindows((w) => ({ ...w, morning: v }))}
            />
            <WindowToggle
              label="Midday"
              hint="A quick, cheerful lift · 11:45–2:15"
              value={windows.midday}
              onChange={(v) => setWindows((w) => ({ ...w, midday: v }))}
            />
            <WindowToggle
              label="Evening"
              hint="Wind down & reflect · 6:30–10:00"
              value={windows.evening}
              onChange={(v) => setWindows((w) => ({ ...w, evening: v }))}
            />
          </View>
          <PrimaryButton label="Continue" onPress={() => setStep('notify')} />
        </View>
      )}

      {step === 'notify' && (
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 12 }}>
          <View style={{ alignItems: 'center', paddingTop: 32, gap: 20 }}>
            <AmelieOrb window="morning" size={120} />
            <Title style={{ textAlign: 'center' }}>One last thing.</Title>
            <AmelieLine style={{ textAlign: 'center' }}>
              Can I reach out with a soft nudge when it’s time? It’s how I’ll find you through
              the day — never noisy, and always yours to switch off.
            </AmelieLine>
            {error && <Muted style={{ textAlign: 'center', color: c.primary }}>{error}</Muted>}
          </View>
          <PrimaryButton label="Let’s begin" onPress={finish} loading={saving} />
        </View>
      )}
    </Screen>
  );
}

function WindowToggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const c = useScheme();
  return (
    <SoftCard style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Title style={{ fontSize: 19, lineHeight: 24 }}>{label}</Title>
        <Muted style={{ fontSize: 14 }}>{hint}</Muted>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: c.primary }} />
    </SoftCard>
  );
}
