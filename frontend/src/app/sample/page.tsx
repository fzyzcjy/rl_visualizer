'use client';

import { ClientOnly } from '@/components/ClientOnly';
import { SampleIndexInput } from '@/components/SampleIndexInput';
import { SampleInfo } from '@/components/SampleInfo';

export default function SamplePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white py-16 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 w-full text-center">
            Sample
          </h1>
        </div>
        <SampleIndexInput />

        <div className="mt-4 w-full">
          <ClientOnly>
            <SampleInfo />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
