import type { DocumentReference } from 'firebase/firestore';

import { readable } from 'svelte/store';
import { onSnapshot } from 'firebase/firestore';

export function docStore<T>(ref: DocumentReference) {
  let unsubscribe: () => void;

  const { subscribe } = readable<T | null>(undefined, (set) => {
    unsubscribe = onSnapshot(ref, (snap) => set((snap.data() as T) ?? null));
    return () => unsubscribe();
  });

  return {
    subscribe,
    _id: ref.id,
    _path: ref.path,
  };
}
