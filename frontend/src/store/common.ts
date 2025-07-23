import { atomWithHash } from 'jotai/utils';

export const runIdAtom = atomWithHash<string>('runId', '');
