import { useEffect, useState } from 'react';

import { pickFresh, recordShown } from '@/engine/rotation';
import { getRecent, setRecent } from '@/lib/storage';

/**
 * Picks one line from a pool on mount, avoiding recently-shown lines (the two-week rule),
 * and records the choice. Returns a stable line for the life of the screen.
 */
export function useRotatingLine(pool: string[], rotationKey: string): string {
  const [line, setLine] = useState<string>(pool[0] ?? '');

  useEffect(() => {
    let active = true;
    (async () => {
      const recent = await getRecent(rotationKey);
      const pick = pickFresh(pool, recent);
      if (!active) return;
      setLine(pick);
      await setRecent(rotationKey, recordShown(pick, recent));
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotationKey]);

  return line;
}
