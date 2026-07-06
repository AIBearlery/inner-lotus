import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AmelieLine, Muted, PrimaryButton, Screen } from '@/components/il/ui';
import { ruleBasedEngine, type ChatStage } from '@/engine/responseEngine';
import { useScheme } from '@/hooks/useScheme';
import { useApp } from '@/lib/appState';
import {
  completeChatSession,
  deleteChatMessages,
  getChatMessages,
  getOrCreateChatSession,
  saveChatMessage,
  todayISODate,
} from '@/lib/db';
import type { ChatMessageType, ChatRole } from '@/types/domain';

type Bubble = { role: ChatRole; text: string };
type Phase = 'loading' | 'chat' | 'done' | 'already';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function EveningChat() {
  const router = useRouter();
  const c = useScheme();
  const { userId } = useApp();

  const [phase, setPhase] = useState<Phase>('loading');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const sessionIdRef = useRef<string | null>(null);
  const sortRef = useRef(0);
  const stageRef = useRef<ChatStage>('opener');
  const awaitingTypeRef = useRef<ChatMessageType | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  const append = useCallback((role: ChatRole, text: string) => {
    setBubbles((b) => [...b, { role, text }]);
  }, []);

  const persist = useCallback(
    async (role: ChatRole, messageType: ChatMessageType, content: string) => {
      const sid = sessionIdRef.current;
      if (!userId || !sid) return;
      try {
        await saveChatMessage({
          session_id: sid,
          user_id: userId,
          role,
          message_type: messageType,
          content,
          sort_order: sortRef.current++,
        });
      } catch {
        // Non-fatal: the conversation continues even if a write fails.
      }
    },
    [userId],
  );

  // Emit Amelie's messages from `fromStage` until we hit a prompt (await user) or the end.
  const amelieTurn = useCallback(
    async (fromStage: ChatStage, lastUserReply?: string) => {
      let stage = fromStage;
      setThinking(true);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const msg = await ruleBasedEngine.getNextMessage({ stage, lastUserReply, conversationHistory: [] });
        await sleep(650);
        append('amelie', msg.text);
        await persist('amelie', msg.messageType, msg.text);

        if (msg.nextStage === 'done') {
          if (sessionIdRef.current) {
            try {
              await completeChatSession(sessionIdRef.current);
            } catch {
              /* non-fatal */
            }
          }
          setThinking(false);
          setPhase('done');
          return;
        }

        stage = msg.nextStage;
        if (msg.awaitReply) {
          stageRef.current = stage;
          awaitingTypeRef.current =
            msg.messageType === 'reflection_prompt' ? 'reflection_reply' : 'gratitude_reply';
          setThinking(false);
          return;
        }
      }
    },
    [append, persist],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      if (!userId) return;
      try {
        const session = await getOrCreateChatSession(userId, todayISODate());
        if (!active) return;
        sessionIdRef.current = session.id;

        if (session.completed_at) {
          const existing = await getChatMessages(session.id);
          if (!active) return;
          setBubbles(existing.map((m) => ({ role: m.role, text: m.content })));
          setPhase('already');
          return;
        }

        await deleteChatMessages(session.id); // clear any abandoned partial
        sortRef.current = 0;
        setPhase('chat');
        await amelieTurn('opener');
      } catch {
        if (active) setPhase('chat');
      }
    })();
    return () => {
      active = false;
    };
  }, [userId, amelieTurn]);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [bubbles, thinking]);

  async function onSend() {
    const reply = input.trim();
    const awaiting = awaitingTypeRef.current;
    if (!reply || !awaiting) return;
    setInput('');
    awaitingTypeRef.current = null;
    append('user', reply);
    await persist('user', awaiting, reply);
    await amelieTurn(stageRef.current, reply);
  }

  const canType = phase === 'chat' && awaitingTypeRef.current != null && !thinking;

  return (
    <Screen window="evening" contentStyle={{ paddingHorizontal: 16 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={12}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingVertical: 18, gap: 14 }}
          keyboardShouldPersistTaps="handled"
        >
          {bubbles.map((b, i) =>
            b.role === 'amelie' ? (
              <View key={i} style={{ maxWidth: '86%', alignSelf: 'flex-start' }}>
                <AmelieLine style={{ fontSize: 19, lineHeight: 27 }}>{b.text}</AmelieLine>
              </View>
            ) : (
              <View
                key={i}
                style={{
                  maxWidth: '82%',
                  alignSelf: 'flex-end',
                  backgroundColor: c.surfaceStrong,
                  borderRadius: 20,
                  borderBottomRightRadius: 6,
                  paddingHorizontal: 15,
                  paddingVertical: 11,
                }}
              >
                <Text style={{ color: c.ink, fontSize: 16, lineHeight: 22 }}>{b.text}</Text>
              </View>
            ),
          )}
          {thinking && <Muted style={{ alignSelf: 'flex-start' }}>Amelie is here…</Muted>}
        </ScrollView>

        {(phase === 'done' || phase === 'already') && (
          <View style={{ paddingVertical: 12, gap: 8 }}>
            {phase === 'already' && (
              <Muted style={{ textAlign: 'center' }}>We already shared the evening. Rest well.</Muted>
            )}
            <PrimaryButton label="Good night" onPress={() => router.replace('/')} />
          </View>
        )}

        {phase === 'chat' && (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 10 }}>
            <TextInput
              value={input}
              onChangeText={setInput}
              editable={canType}
              placeholder={canType ? 'Type as much or as little as you like…' : 'One moment…'}
              placeholderTextColor={c.muted}
              multiline
              style={{
                flex: 1,
                minHeight: 48,
                maxHeight: 120,
                backgroundColor: c.surface,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: c.border,
                paddingHorizontal: 16,
                paddingVertical: 12,
                color: c.ink,
                fontSize: 16,
              }}
            />
            <Pressable
              onPress={onSend}
              disabled={!canType || !input.trim()}
              style={{
                backgroundColor: c.primary,
                borderRadius: 24,
                paddingHorizontal: 18,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !canType || !input.trim() ? 0.5 : 1,
              }}
            >
              <Text style={{ color: c.onPrimary, fontWeight: '800' }}>Send</Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </Screen>
  );
}
