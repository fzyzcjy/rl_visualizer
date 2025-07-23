'use client';

import { useAtom } from 'jotai';
import { rolloutIdAtom } from '@/store/rollout';

export function RolloutIdInput() {
  const [rolloutId, setRolloutId] = useAtom(rolloutIdAtom);

  return (
    <div className="mb-4">
      <input
        type="number"
        placeholder="Enter rollout_id"
        value={rolloutId ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          setRolloutId(value === '' ? null : parseInt(value, 10));
        }}
        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
