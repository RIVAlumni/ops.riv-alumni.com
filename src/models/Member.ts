import { firestore } from 'firebase/app';

export interface Member {
  /**
   * @readonly
   * Unique membership identifier.
   */
  'Membership ID': string;
  /**
   * Legal full name of the alumnus.
   */
  'Full Name': string;
  /**
   * Legal gender of the alumnus.
   */
  'Gender': string;
  /**
   * Email address of the alumnus.
   *
   * @remarks
   * Email addresses are used for identifying and linking pre-existing/new
   * user accounts to a membership account via a secured environment in
   * Cloud Functions.
   */
  'Email': string | null;
  /**
   * Contactable phone number of the alumnus.
   */
  'Contact Number': number;
  /**
   * Secondary contactable phone number of the alumnus.
   */
  'Home Number': number | null;
  /**
   * Current school of study of the alumnus.
   */
  'Current School': string | null;
  /**
   * Graduating class of the alumnus.
   */
  'Graduating Class': string;
  /**
   * Graduating year of the alumnus.
   */
  'Graduating Year': number;
  /**
   * Name of the parent/guardian of the alumnus.
   */
  'Name of Next-Of-Kin': string;
  /**
   * Relationship of the parent/guardian with the alumnus.
   */
  'Relationship with Next-Of-Kin': string;
  /**
   * Contactable number of the parent/guardian of the alumnus.
   */
  'Contact Number of Next-Of-Kin': number;
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
