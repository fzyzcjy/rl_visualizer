import { atom } from 'jotai';
import { atomWithHash } from 'jotai-location';
import { atomWithQuery } from 'jotai-tanstack-query';
import { getApiRolloutRolloutIdGet } from '@/api_client';
import { runIdAtom } from './common';
import { unwrapApiResult } from '@/utils/api_utils';

export const rolloutIdAtom = atomWithHash<number>('rolloutId', 0);

export const rolloutQueryAtom = atomWithQuery((get) => {
  const runId = get(runIdAtom);
  const rolloutId = get(rolloutIdAtom);
  return {
    queryKey: ['rollout', runId, rolloutId],
    queryFn: () => unwrapApiResult(
      getApiRolloutRolloutIdGet({
        path: { rollout_id: rolloutId },
        query: { run_id: runId },
      })
    ),
    enabled: !!runId && rolloutId !== null,
  };
});
