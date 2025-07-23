'use client';

import { useAtomValue } from 'jotai';
import { sampleQueryAtom } from '@/store/sample';
import { tokenizerQueryAtom } from '@/store/metadata';
import { replaceMulti } from '@/utils/misc';
import { tokenReplacementMap } from '@/utils/tokenizer_utils';

interface TokenProps {
  text: string;
  colorValue?: number;
  minColorValue: number;
  maxColorValue: number;
}

const Token: React.FC<TokenProps> = ({ text, colorValue, minColorValue, maxColorValue }) => {
  const cleanedText = replaceMulti(text, tokenReplacementMap);
  let style = {};

  if (colorValue !== undefined) {
    const normalizedValue = (colorValue - minColorValue) / (maxColorValue - minColorValue);
    const alpha = isNaN(normalizedValue) ? 0 : normalizedValue;
    style = { backgroundColor: `rgba(0, 0, 255, ${alpha})` };
  }

  return <span style={style}>{cleanedText}</span>;
};

export function SampleInfo() {
  const sampleQuery = useAtomValue(sampleQueryAtom);
  const tokenizerQuery = useAtomValue(tokenizerQueryAtom);

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

  const { tokens, log_probs } = sampleQuery.data;
  const { id_to_str } = tokenizerQuery.data;

  const requestLength = tokens.length - sampleQuery.data.response_length;
  const colorValues = log_probs;
  const minColorValue = Math.min(...colorValues);
  const maxColorValue = Math.max(...colorValues);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Decoded Tokens</h2>
        <p className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap break-words">
          {tokens.map((token, index) => {
            const responseIndex = (index >= requestLength) ? (index - requestLength) : undefined;
            return (
              <Token
                key={index}
                text={id_to_str[token] ?? `[UNK:${token}]`}
                colorValue={responseIndex !== undefined ? log_probs[responseIndex] : undefined}
                minColorValue={minColorValue}
                maxColorValue={maxColorValue}
              />
            );
          })}
        </p>
      </div>
      <pre className="w-full p-4 bg-gray-100 border border-ray-300 rounded-md overflow-x-auto">
        {JSON.stringify(sampleQuery.data, null, 2)}
      </pre>
    </div>
  );
}
