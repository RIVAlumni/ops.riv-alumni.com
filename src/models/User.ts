import { firestore } from 'firebase/app';

export interface User {
  /**
   * @readonly
   * User identifier of the registered user.
   */
  'User ID': string;
  /**
   * @readonly
   * Email address of the registered user.
   */
  'Email': string | null;
  /**
   * Profile picture of the registered user.
   */
  'Photo URL': string | null;
  /**
   * Display Name of the registered user.
   */
  'Display Name': string | null;
  /**
   * @readonly
   * Membership document identifier of the registered user, with `null` being
   * equivalent to "not a member".
   */
  'Membership ID': string | null;
  /**
   * Levels of access granted to the registered user.
   */
  'Access Level': UserAccessLevels;
  /**
   * @readonly
   * Timestamp of the last document update.
   */
  'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   * Timestamp of when the document was created.
   */
  'createdAt': firestore.FieldValue;
}

export enum UserAccessLevels {
  Anonymous = 0,
  Alumni = 1,
  Editor = 2,
  Administrator = 3,
}
