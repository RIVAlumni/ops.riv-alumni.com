import { firestore } from 'firebase/app';

export interface User {
  'User ID': string;
  'Email': string | null;
  'Photo URL': string | null;
  'Display Name': string | null;
  'Membership ID': string | null;
  'Access Level': number;
  'refreshTime': firestore.FieldValue;
  'updatedAt': firestore.FieldValue;
  'createdAt': firestore.FieldValue;
}
