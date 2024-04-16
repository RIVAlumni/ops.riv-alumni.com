import type { FSMetadata } from './FSMetadata';

/**
 * Firebase Auth user
 */
interface FSUser extends FSMetadata {
  readonly uid: string;
  readonly email: string | null;
  readonly email_verified: boolean;
  readonly display_name: string | null;
  readonly photo_url: string | null;
  readonly is_onboarded: boolean;
  readonly is_suspended: boolean;
}

export type { FSUser };
