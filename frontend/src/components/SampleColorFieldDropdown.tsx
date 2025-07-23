'use client';

import { sampleColorFieldAtom } from '@/store/sample';
import { useAtom } from 'jotai';

const options = ['log_probs', 'ref_log_probs', 'advantages', 'returns', 'loss_masks'];

export function SampleColorFieldDropdown() {
  const [sampleColorField, setSampleColorField] = useAtom(sampleColorFieldAtom);

  return (
    <div className="mb-4">
      <label htmlFor="color-value-select" className="block text-sm font-medium text-gray-700 mb-1">
        Color Value
      </label>
      <select
        id="color-value-select"
        value={sampleColorField}
        onChange={(e) => setSampleColorField(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}