import type { FSUser } from '@riva/shared';

import { FieldValue } from 'firebase-admin/firestore';

import { logger } from 'firebase-functions/v2';
import { beforeUserCreated } from 'firebase-functions/v2/identity';

import { userRef } from '../references';

export const authBeforeUserCreated = beforeUserCreated(async (event) => {
  logger.log(event);

  const {
    data: {
      uid,
      email = null,
      emailVerified,
      displayName = null,
      photoURL = null,
    },
  } = event;

  const fsUser: FSUser = {
    uid: uid,
    email: email,
    email_verified: emailVerified,
    display_name: displayName,
    photo_url: photoURL,
    is_onboarded: false,
    is_suspended: false,
    updated_at: FieldValue.serverTimestamp(),
    created_at: FieldValue.serverTimestamp(),
  };

  try {
    logger.log(fsUser);
    await userRef(uid).set(fsUser);
  } catch (error) {
    logger.error(error);
  }

  return {};
});
