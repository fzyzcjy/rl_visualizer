'use client';

import { SampleIndexInput } from '@/components/SampleIndexInput';
import { sampleQueryAtom } from '@/store/sample';
import { useAtomValue } from 'jotai';

export default function SamplePage() {
  const { data, isLoading, isError, error } = useAtomValue(sampleQueryAtom);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white py-16 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 w-full text-center">
            Sample
          </h1>
        </div>
        <SampleIndexInput />

        <div className="mt-4 w-full">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {JSON.stringify(error)}</div>}
          {data && (
            <pre className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
