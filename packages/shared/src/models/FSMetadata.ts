import type { FieldValue } from 'firebase/firestore';

interface FSMetadata {
  readonly updated_at: FieldValue;
  readonly created_at: FieldValue;
}

export type { FSMetadata };
