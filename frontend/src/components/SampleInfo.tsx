'use client';

import { useAtomValue } from 'jotai';
import { sampleQueryAtom } from '@/store/sample';
import { tokenizerQueryAtom } from '@/store/metadata';

export function SampleInfo() {
  const {
    data: sampleData,
    isLoading: isSampleLoading,
    isError: isSampleError,
    error: sampleError,
  } = useAtomValue(sampleQueryAtom);
  const {
    data: tokenizerData,
    isLoading: isTokenizerLoading,
    isError: isTokenizerError,
    error: tokenizerError,
  } = useAtomValue(tokenizerQueryAtom);

  if (isSampleLoading || isTokenizerLoading) {
    return <div>Loading...</div>;
  }

  if (isSampleError) {
    return <div>Error loading sample: {JSON.stringify(sampleError)}</div>;
  }

  if (isTokenizerError) {
    return <div>Error loading tokenizer: {JSON.stringify(tokenizerError)}</div>;
  }

  if (!sampleData) {
    return null;
  }

  const decodedTokens = sampleData.tokens
    .map((token) => tokenizerData?.id_to_str[token] ?? `[UNK:${token}]`)
    .join('');

  const { tokens, ...otherData } = sampleData;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Decoded Tokens</h2>
        <p className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap break-words">
          {decodedTokens}
        </p>
      </div>
      <pre className="w-full p-4 bg-gray-100 border border-ray-300 rounded-md overflow-x-auto">
        {JSON.stringify(otherData, null, 2)}
      </pre>
    </div>
  );
}
