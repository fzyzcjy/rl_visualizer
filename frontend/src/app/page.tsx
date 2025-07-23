'use client';

import { RolloutIdInput } from '@/components/RolloutIdInput';
import { RolloutTable } from '@/components/RolloutTable';
import { rolloutQueryAtom } from '@/store/rollout';
import { useAtomValue } from 'jotai';

export default function HomePage() {
  const { data, isLoading, isError, error } = useAtomValue(rolloutQueryAtom);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white py-16 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 w-full text-center">
            Homepage
          </h1>
        </div>
        <RolloutIdInput />

        <div className="mt-4 w-full">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {JSON.stringify(error)}</div>}
          {data && <RolloutTable data={data.table_rows} />}
        </div>
      </div>
    </div>
  );
}
