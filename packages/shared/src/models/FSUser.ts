import type { FSMetadata } from '$lib/models';

/**
 * Firebase Auth user
 */
interface FSUser extends FSMetadata {
  readonly uid: string;
  readonly email: string;
  readonly email_verified: string;
  readonly display_name: string;
  readonly photo_url: string;
  readonly is_onboarded: string;
  readonly is_suspended: string;
}

export type { FSUser };
