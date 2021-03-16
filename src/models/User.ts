import { firestore } from 'firebase/app';

export interface PartialUser {
  /**
   * @readonly
   * Email address of the registered user.
   */
  readonly 'Email': string;
  /**
   * @readonly
   * Profile picture of the registered user.
   */
  readonly 'Photo URL': string;
  /**
   * @readonly
   * Display Name of the registered user.
   */
  readonly 'Display Name': string;
  /**
   * @readonly
   * Membership document identifier of the registered user, with `null` being
   * equivalent to "not a member".
   */
  readonly 'Membership ID': string | null;
  /**
   * Levels of access granted to the registered user.
   */
  'Access Level': UserAccessLevels;
}

export interface User extends PartialUser {
  /**
   * @readonly
   * User identifier of the registered user.
   */
  readonly 'User ID': string;
  /**
   * @readonly
   * Timestamp of the last document update.
   */
  readonly 'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   * Timestamp of when the document was created.
   */
  readonly 'createdAt': firestore.FieldValue;
}

export enum UserAccessLevels {
  Anonymous = 0,
  Alumni = 1,
  Editor = 2,
  Administrator = 3,
}
