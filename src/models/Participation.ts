import { firestore } from 'firebase/app';

export interface Participation {
  /**
   * @readonly
   * Unique membership identifer of the alumnus.
   */
  'Membership ID': string;
  /**
   * @readonly
   * Unique event identifier.
   */
  'Event Code': number;
  /**
   * Unique identifer of the role.
   */
  'Role': string;
  /**
   * VIA hours accumulated by the alumnus.
   */
  'VIA Hours': number;
  /**
   * @readonly
   */
  'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   */
  'createdAt': firestore.FieldValue;
}
