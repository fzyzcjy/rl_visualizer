'use client';

import { useAtomValue } from 'jotai';
import { sampleColorFieldAtom, sampleQueryAtom } from '@/store/sample';
import { tokenizerQueryAtom } from '@/store/metadata';
import { assert, replaceMulti } from '@/utils/misc';
import { tokenReplacementMap } from '@/utils/tokenizer_utils';
import { useState } from 'react';
import { SampleColorFieldDropdown } from './SampleColorFieldDropdown';

interface TokenProps {
  text: string;
  colorValue?: number;
  minColorValue: number;
  maxColorValue: number;
}

const Token: React.FC<TokenProps> = ({ text, colorValue, minColorValue, maxColorValue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cleanedText = replaceMulti(text, tokenReplacementMap);
  let style = {};

  if (colorValue !== undefined) {
    const normalizedValue = (colorValue - minColorValue) / (maxColorValue - minColorValue);
    const alpha = isNaN(normalizedValue) ? 0 : normalizedValue;
    style = { backgroundColor: `rgba(0, 0, 255, ${alpha})` };
  }

  return (
    <span
      className="relative"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cleanedText}
      {isHovered && colorValue !== undefined && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10 mb-1">
          {colorValue.toFixed(4)}
        </div>
      )}
    </span>
  );
};

export function SampleInfo() {
  const sampleQuery = useAtomValue(sampleQueryAtom);
  const tokenizerQuery = useAtomValue(tokenizerQueryAtom);
  const sampleColorField = useAtomValue(sampleColorFieldAtom);

  if (sampleQuery.isLoading || tokenizerQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (sampleQuery.isError) {
    return <div>Error loading sample: {JSON.stringify(sampleQuery.error)}</div>;
  }

  if (tokenizerQuery.isError) {
    return <div>Error loading tokenizer: {JSON.stringify(tokenizerQuery.error)}</div>;
  }

  if (!sampleQuery.data || !tokenizerQuery.data) {
    return null;
  }

  const { tokens } = sampleQuery.data;
  const { id_to_str } = tokenizerQuery.data;

  const requestLength = tokens.length - sampleQuery.data.response_length;
  const colorValues = sampleQuery.data[sampleColorField as keyof typeof sampleQuery.data] as number[] | undefined;
  assert(!!colorValues);

  const minColorValue = Math.min(...colorValues);
  const maxColorValue = Math.max(...colorValues);

  return (
    <div>
      <SampleColorFieldDropdown />
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Decoded Tokens</h2>
        <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap break-words">
          {tokens.map((token, index) => {
            const responseIndex = (index >= requestLength) ? (index - requestLength) : undefined;
            return (
              <Token
                key={index}
                text={id_to_str[token] ?? `[UNK:${token}]`}
                colorValue={responseIndex !== undefined ? colorValues[responseIndex] : undefined}
                minColorValue={minColorValue}
                maxColorValue={maxColorValue}
              />
            );
          })}
        </div>
      </div>
      <pre className="w-full p-4 bg-gray-100 border border-ray-300 rounded-md overflow-x-auto">
        {JSON.stringify(sampleQuery.data, null, 2)}
      </pre>
    </div>
  );
}
