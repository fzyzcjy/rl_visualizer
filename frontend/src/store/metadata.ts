import { atomWithQuery } from 'jotai-tanstack-query';
import { getTokenizerApiMetadataTokenizerGet } from '@/api_client';
import { runIdAtom } from './common';
import { unwrapApiResult } from '@/utils/api_utils';

export const tokenizerQueryAtom = atomWithQuery((get) => {
  const runId = get(runIdAtom);
  return {
    queryKey: ['tokenizer', runId],
    queryFn: () =>
      unwrapApiResult(
        getTokenizerApiMetadataTokenizerGet({
          query: { run_id: runId },
        })
      ),
    enabled: !!runId,
  };
});
