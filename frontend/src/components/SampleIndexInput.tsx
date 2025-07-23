'use client';

import { useAtom } from 'jotai';
import { sampleIndexAtom } from '@/store/sample';

export function SampleIndexInput() {
  const [sampleIndex, setSampleIndex] = useAtom(sampleIndexAtom);

  return (
    <div className="mb-4">
      <input
        type="number"
        placeholder="Enter sample_index"
        value={sampleIndex ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          setSampleIndex(value === '' ? null : parseInt(value, 10));
        }}
        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
