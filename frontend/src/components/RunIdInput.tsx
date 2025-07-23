"use client";

import { useAtom } from "jotai";
import { runIdAtom } from "@/store/common";

export function RunIdInput() {
  const [runId, setRunId] = useAtom(runIdAtom);

  return (
    <div className="fixed top-4 right-4">
      <input
        type="text"
        placeholder="Enter run_id"
        value={runId ?? ""}
        onChange={(e) => setRunId(e.target.value)}
        className="px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
