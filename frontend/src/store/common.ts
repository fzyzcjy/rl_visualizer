import { atomWithHash } from 'jotai-location';

export const runIdAtom = atomWithHash<string>('runId', '');
