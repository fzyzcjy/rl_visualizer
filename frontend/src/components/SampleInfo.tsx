'use client';

import { useAtomValue } from 'jotai';
import { sampleQueryAtom } from '@/store/sample';
import { tokenizerQueryAtom } from '@/store/metadata';

const specialCharMapping: Record<string, string> = {
  'Ċ': '\n',
  'Ġ': ' ',
};

const replaceSpecialChars = (text: string) => {
  let newText = text;
  for (const [special, replacement] of Object.entries(specialCharMapping)) {
    newText = newText.replace(new RegExp(special, 'g'), replacement);
  }
  return newText;
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

  if (!sampleQuery.data) {
    return null;
  }

  const decodedTokens = sampleQuery.data.tokens
    .map((token) => tokenizerQuery.data?.id_to_str[token] ?? `[UNK:${token}]`)
    .join('');

  const cleanedText = replaceSpecialChars(decodedTokens);

  const { tokens, ...otherData } = sampleQuery.data;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Decoded Tokens</h2>
        <p className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap break-words">
          {cleanedText}
        </p>
      </div>
      <pre className="w-full p-4 bg-gray-100 border border-ray-300 rounded-md overflow-x-auto">
        {JSON.stringify(otherData, null, 2)}
      </pre>
    </div>
  );
}
