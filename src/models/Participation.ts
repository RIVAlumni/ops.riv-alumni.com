import { firestore } from 'firebase/app';

export interface PartialParticipation {
  /**
   * @readonly
   * Unique membership identifer of the alumni.
   */
  readonly 'Membership ID': string;
  /**
   * @readonly
   * Unique event identifier.
   */
  readonly 'Event Code': number;
  /**
   * Unique identifer of the role.
   */
  'Role': string;
  /**
   * VIA hours accumulated by the alumni.
   */
  'VIA Hours': number;
}

export interface Participation extends PartialParticipation {
  /**
   * @readonly
   * Unique participation identifier for the event.
   */
  readonly 'Participation ID': string;
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
