'use client';

import { useAtomValue } from 'jotai';
import { sampleQueryAtom } from '@/store/sample';
import { tokenizerQueryAtom } from '@/store/metadata';

const tokenReplacementMap: Record<string, string> = {
  'Ċ': '\n',
  'Ġ': ' ',
};

const replaceMulti = (text: string, replacementMap: Record<string, string>) => {
  let newText = text;
  for (const [from, to] of Object.entries(replacementMap)) {
    newText = newText.replace(new RegExp(from, 'g'), to);
  }
  return newText;
};

interface TokenProps {
  text: string;
  logProb?: number;
  minLogProb: number;
  maxLogProb: number;
}

const Token: React.FC<TokenProps> = ({ text, logProb, minLogProb, maxLogProb }) => {
  const cleanedText = replaceMulti(text, tokenReplacementMap);
  let style = {};

  if (logProb !== undefined) {
    const normalizedProb = (logProb - minLogProb) / (maxLogProb - minLogProb);
    const alpha = isNaN(normalizedProb) ? 0 : normalizedProb;
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
  const minLogProb = Math.min(...log_probs);
  const maxLogProb = Math.max(...log_probs);

  const { tokens: _, ...otherData } = sampleQuery.data;

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
                logProb={responseIndex !== undefined ? log_probs[responseIndex] : undefined}
                minLogProb={minLogProb}
                maxLogProb={maxLogProb}
              />
            );
          })}
        </p>
      </div>
      <pre className="w-full p-4 bg-gray-100 border border-ray-300 rounded-md overflow-x-auto">
        {JSON.stringify(otherData, null, 2)}
      </pre>
    </div>
  );
}
