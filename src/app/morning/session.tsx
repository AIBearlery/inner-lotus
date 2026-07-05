import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AmelieOrb } from '@/components/amelie/AmelieOrb';
import { AmelieLine, Muted, PrimaryButton, Screen, Title } from '@/components/il/ui';
import { getAudioSource } from '@/content/audioSources';
import { getMeditation } from '@/content/meditations';
import { useScheme } from '@/hooks/useScheme';
import { useApp } from '@/lib/appState';
import { configureAudioModeForPlayback } from '@/lib/audio';
import { saveMeditationCompletion } from '@/lib/db';

type Phase = 'seed' | 'practice' | 'done';

export default function Session() {
  const router = useRouter();
  const c = useScheme();
  const { userId } = useApp();
  const params = useLocalSearchParams<{ meditationId?: string; checkInId?: string }>();

  const meditation = getMeditation(params.meditationId ?? '');
  const source = meditation ? getAudioSource(meditation.audio.assetId) : null;
  const hasAudio = source != null;

  // The hook must be called unconditionally; a null source simply loads nothing.
  const player = useAudioPlayer(source ?? undefined);
  const status = useAudioPlayerStatus(player);

  const [phase, setPhase] = useState<Phase>('seed');
  const [elapsed, setElapsed] = useState(0); // seconds, used for the no-audio fallback
  const savedRef = useRef(false);

  const durationSec = meditation?.audio.durationSec ?? 180;

  const finish = useCallback(
    async (listenedSec: number) => {
      if (savedRef.current) return;
      savedRef.current = true;
      setPhase('done');
      try {
        if (userId && meditation) {
          await saveMeditationCompletion({
            user_id: userId,
            meditation_id: meditation.id,
            check_in_id: params.checkInId ? params.checkInId : null,
            duration_listened_sec: Math.round(listenedSec),
          });
        }
      } catch {
        // Non-fatal: the practice still counts even if the log write fails.
      }
    },
    [userId, meditation, params.checkInId],
  );

  // Audio path: start playback when entering practice; finish when the track ends.
  useEffect(() => {
    if (phase !== 'practice' || !hasAudio) return;
    let cancelled = false;
    configureAudioModeForPlayback().then(() => {
      if (!cancelled) player.play();
    });
    return () => {
      cancelled = true;
    };
  }, [phase, hasAudio, player]);

  useEffect(() => {
    if (phase === 'practice' && hasAudio && status.didJustFinish) {
      finish(status.currentTime || durationSec);
    }
  }, [phase, hasAudio, status.didJustFinish, status.currentTime, durationSec, finish]);

  // No-audio fallback: a gentle timer for the intended length.
  useEffect(() => {
    if (phase !== 'practice' || hasAudio) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= durationSec) {
          clearInterval(id);
          finish(next);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, hasAudio, durationSec, finish]);

  if (!meditation) {
    return (
      <Screen window="morning" contentStyle={{ alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Title>That practice slipped away.</Title>
        <PrimaryButton label="Back to start" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  // --- Seed: shown with eyes open, before the guidance begins ---
  if (phase === 'seed') {
    return (
      <Screen window="morning">
        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 16 }}>
          <View style={{ flex: 1, justifyContent: 'center', gap: 22 }}>
            <Muted>{meditation.title} · {meditation.lengthMin} min</Muted>
            <AmelieLine style={{ fontSize: 25, lineHeight: 36 }}>“{meditation.seed.text}”</AmelieLine>
            {meditation.seed.attribution && (
              <Muted>— {meditation.seed.attribution}</Muted>
            )}
          </View>
          <View style={{ gap: 10 }}>
            <PrimaryButton label="Begin — close your eyes, I’m with you" onPress={() => setPhase('practice')} />
            {!hasAudio && (
              <Muted style={{ textAlign: 'center' }}>
                Amelie’s voice for this one is coming soon — for now, follow the orb’s breath.
              </Muted>
            )}
          </View>
        </View>
      </Screen>
    );
  }

  // --- Done: a soft close ---
  if (phase === 'done') {
    return (
      <Screen window="morning" contentStyle={{ justifyContent: 'space-between', paddingVertical: 24 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22 }}>
          <AmelieOrb window="morning" size={120} />
          <Title style={{ textAlign: 'center' }}>That’s the day begun.</Title>
          <AmelieLine style={{ textAlign: 'center' }}>
            However today unfolds, we began it gently — together. I’m glad to be here with you.
          </AmelieLine>
        </View>
        <PrimaryButton label="Carry on with your day" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  // --- Practice: minimal, calm, made for closed eyes ---
  const pct = hasAudio
    ? status.duration > 0
      ? status.currentTime / status.duration
      : 0
    : elapsed / durationSec;

  return (
    <Screen window="morning" contentStyle={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 28 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <AmelieOrb window="morning" size={200} />
        <AmelieLine style={{ textAlign: 'center' }}>
          {hasAudio ? 'Let your eyes close — I’m right here with you.' : 'In as it grows… out as it softens. I’m right here.'}
        </AmelieLine>
      </View>

      <View style={{ width: '100%', gap: 18 }}>
        <View style={[styles.track, { backgroundColor: c.border }]}>
          <View style={[styles.fill, { backgroundColor: c.primary, width: `${Math.min(100, pct * 100)}%` }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 28 }}>
          {hasAudio && (
            <Pressable onPress={() => (status.playing ? player.pause() : player.play())}>
              <Text style={{ color: c.primary, fontSize: 16, fontWeight: '700' }}>
                {status.playing ? 'Pause' : 'Play'}
              </Text>
            </Pressable>
          )}
          <Pressable onPress={() => finish(hasAudio ? status.currentTime : elapsed)}>
            <Text style={{ color: c.muted, fontSize: 16, fontWeight: '700' }}>End gently</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
});
