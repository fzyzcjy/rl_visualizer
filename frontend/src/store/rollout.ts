import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import { getApiRolloutRolloutIdGet } from '@/api_client';
import { runIdAtom } from './common';
import { unwrapApiResult } from '@/utils/api_utils';

export const rolloutIdAtom = atom<number | null>(null);

export const rolloutQueryAtom = atomWithQuery((get) => {
  const runId = get(runIdAtom);
  const rolloutId = get(rolloutIdAtom);
  return {
    queryKey: ['rollout', runId, rolloutId],
    queryFn: () => {
      if (!runId || rolloutId === null) {
        return null;
      }
      return unwrapApiResult(
        getApiRolloutRolloutIdGet({
          path: { rollout_id: rolloutId },
          query: { run_id: runId },
        })
      );
    },
  };
});
