import { atomWithQuery } from 'jotai-tanstack-query';
import { getApiSampleSampleIndexGet } from '@/api_client';
import { runIdAtom } from './common';
import { unwrapApiResult } from '@/utils/api_utils';
import { atomWithHash } from 'jotai-location';

export const sampleIndexAtom = atomWithHash<number>('sample_index', 0);

export const sampleQueryAtom = atomWithQuery((get) => {
  const runId = get(runIdAtom);
  const sampleIndex = get(sampleIndexAtom);
  return {
    queryKey: ['sample', runId, sampleIndex],
    queryFn: () => unwrapApiResult(
      getApiSampleSampleIndexGet({
        path: { sample_index: sampleIndex },
        query: { run_id: runId },
      })
    ),
    enabled: !!runId && sampleIndex !== null,
  };
});
