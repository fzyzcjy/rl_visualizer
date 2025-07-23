'use client';

import { useAtomValue } from 'jotai';
import { sampleQueryAtom } from '@/store/sample';

export function SampleInfo() {
  const { data, isLoading, isError, error } = useAtomValue(sampleQueryAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <pre className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
