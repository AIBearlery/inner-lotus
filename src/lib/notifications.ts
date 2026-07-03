// Local, scheduled notifications (expo-notifications, SDK 57). We use one-off DATE triggers
// at a RANDOM time inside each enabled window — so a greeting feels like a friend thinking
// of you, never a fixed-hour alarm. Expo Go can't receive remote push (SDK 53+), but local
// scheduled notifications work fine on a physical iPhone via Expo Go, which is the trial plan.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { pickFresh, recordShown } from '@/engine/rotation';
import { getRecent, setRecent } from '@/lib/storage';
import type { DayWindow } from '@/types/domain';

/** Daily windows, in minutes from midnight. */
export const WINDOWS: Record<DayWindow, { startMin: number; endMin: number }> = {
  morning: { startMin: 7 * 60 + 30, endMin: 9 * 60 }, // 07:30–09:00
  midday: { startMin: 11 * 60 + 45, endMin: 14 * 60 + 15 }, // 11:45–14:15
  evening: { startMin: 18 * 60 + 30, endMin: 22 * 60 }, // 18:30–22:00
};

type Rng = () => number;

/** Pure: a Date on `baseDate`'s calendar day at a random minute inside the window. */
export function randomTimeInWindow(
  window: DayWindow,
  baseDate: Date,
  rng: Rng = Math.random,
): Date {
  const { startMin, endMin } = WINDOWS[window];
  const minute = startMin + Math.floor(rng() * (endMin - startMin + 1));
  const d = new Date(baseDate);
  d.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
  return d;
}

/** Configure how a notification presents while the app is foregrounded. */
export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/** Ask for notification permission (iOS requires this explicitly during onboarding). */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Amelie',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export type WindowSchedule = {
  window: DayWindow;
  /** Copy pool to rotate through for this window's greeting. */
  pool: string[];
  /** AsyncStorage key tracking this pool's recent-shown history. */
  rotationKey: string;
  /** Optional notification title; the greeting itself is the body. */
  title?: string;
};

/**
 * Cancel every scheduled notification and re-schedule the next `days` days for each enabled
 * window, each at a fresh random time with a non-repeating greeting. Called after onboarding
 * and on app open, so the rolling schedule stays topped up.
 */
export async function rescheduleWindowNotifications(
  schedules: WindowSchedule[],
  opts: { days?: number; now?: Date } = {},
): Promise<number> {
  const days = opts.days ?? 7;
  const now = opts.now ?? new Date();

  await Notifications.cancelAllScheduledNotificationsAsync();

  let scheduledCount = 0;

  for (const { window, pool, rotationKey, title } of schedules) {
    if (pool.length === 0) continue;
    let recent = await getRecent(rotationKey);

    for (let offset = 0; offset < days; offset++) {
      const day = new Date(now);
      day.setDate(now.getDate() + offset);
      const fireDate = randomTimeInWindow(window, day);

      // Skip a time that's already passed today.
      if (fireDate.getTime() <= now.getTime()) continue;

      const body = pickFresh(pool, recent);
      recent = recordShown(body, recent);

      await Notifications.scheduleNotificationAsync({
        content: { title: title ?? null, body, data: { window } },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: fireDate,
        },
      });
      scheduledCount++;
    }

    await setRecent(rotationKey, recent);
  }

  return scheduledCount;
}
