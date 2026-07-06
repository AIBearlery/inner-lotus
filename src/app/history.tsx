import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { AmelieLine, Muted, PrimaryButton, Screen, SoftCard, Title } from '@/components/il/ui';
import { useApp } from '@/lib/appState';
import { getGratitudeEntries, getRecentCheckIns } from '@/lib/db';
import type { ChatMessage, CheckIn } from '@/types/domain';

function prettyDate(iso: string): string {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function History() {
  const router = useRouter();
  const { ready, userId } = useApp();
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [gratitude, setGratitude] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!ready || !userId) return;
      try {
        const [ci, gr] = await Promise.all([getRecentCheckIns(30), getGratitudeEntries(30)]);
        if (!active) return;
        setCheckIns(ci);
        setGratitude(gr);
      } catch {
        // Leave lists empty on failure; the screen still renders gracefully.
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [ready, userId]);

  const empty = !loading && checkIns.length === 0 && gratitude.length === 0;

  return (
    <Screen window="evening">
      <View style={{ flex: 1, gap: 14, paddingTop: 12 }}>
        <Title>Your quiet trail</Title>
        <AmelieLine>The small things we’ve gathered, morning by morning, evening by evening.</AmelieLine>

        {empty ? (
          <Muted style={{ marginTop: 20 }}>
            Nothing here yet — after a few check-ins and evenings, your trail will fill in softly.
          </Muted>
        ) : (
          <ScrollView contentContainerStyle={{ gap: 20, paddingVertical: 8, paddingBottom: 24 }}>
            {gratitude.length > 0 && (
              <View style={{ gap: 10 }}>
                <Muted style={{ fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Good things
                </Muted>
                {gratitude.map((g) => (
                  <SoftCard key={g.id}>
                    <Muted style={{ fontSize: 13 }}>{prettyDate(g.created_at)}</Muted>
                    <AmelieLine style={{ fontSize: 17, lineHeight: 24, marginTop: 4 }}>{g.content}</AmelieLine>
                  </SoftCard>
                ))}
              </View>
            )}

            {checkIns.length > 0 && (
              <View style={{ gap: 10 }}>
                <Muted style={{ fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Mornings
                </Muted>
                {checkIns.map((ci) => (
                  <SoftCard key={ci.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Muted style={{ fontSize: 14 }}>{prettyDate(ci.date)}</Muted>
                    <Muted style={{ fontSize: 14, color: undefined }}>
                      {ci.energy} · {ci.purpose}
                    </Muted>
                  </SoftCard>
                ))}
              </View>
            )}
          </ScrollView>
        )}

        <PrimaryButton label="Back" variant="ghost" onPress={() => router.replace('/')} />
      </View>
    </Screen>
  );
}
