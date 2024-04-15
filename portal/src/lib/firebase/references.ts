import { doc } from 'firebase/firestore';

import { firestore } from '$lib/firebase';

export const userRef = (uid: string) => doc(firestore, 'users', uid);
export const memberRef = (uid: string) => doc(firestore, 'members', uid);
export const eventRef = (uid: string) => doc(firestore, 'events', uid);
