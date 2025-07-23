"use client";

import { useAtom } from "jotai";
import { rolloutIdAtom } from "@/store/rollout";

export function RolloutIdInput() {
  const [rolloutId, setRolloutId] = useAtom(rolloutIdAtom);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter rollout_id"
        value={rolloutId}
        onChange={(e) => setRolloutId(e.target.value)}
        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
