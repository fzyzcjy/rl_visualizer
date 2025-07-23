'use client';

import { useAtomValue } from 'jotai';
import { rolloutQueryAtom } from '@/store/rollout';
import { RolloutSamplesTable } from './RolloutSamplesTable';

export function RolloutInfo() {
  const { data, isLoading, isError, error } = useAtomValue(rolloutQueryAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return null;
  }

  return <RolloutSamplesTable data={data.table_rows} />;
}
