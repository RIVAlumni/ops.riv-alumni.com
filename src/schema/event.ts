import * as yup from 'yup';
import { firestore } from 'firebase/app';

const FORM_SCHEMA_EVENT = () =>
  yup
    .object()
    .strict(true)
    .shape({
      'Event Code': yup
        .string()
        .trim()
        .required('Please select the event date.')
        .default(null),
      'Event Name': yup
        .string()
        .trim()
        .required('Please enter the event name.')
        .transform((value: string) => value.toUpperCase())
        .default(null),
      'Event Thumbnail': yup
        .mixed<File>()
        .required('Please select an event thumbnail.')
        .test(
          'isValidFileSize',
          'Event Thumbnail is too large!',
          (value) => value! && value.size <= 1000000
        )
        .default(null),
      'Event Overall In-Charge': yup
        .string()
        .trim()
        .required('Please select an overall in-charge.')
        .default(null),
      'Event Assistant In-Charge': yup
        .string()
        .trim()
        .required('Please select an assistant in-charge.')
        .default(null),
      'Google Drive': yup
        .string()
        .trim()
        .url('Please enter a valid URL.')
        .required('Please enter the Google Drive URL.')
        .test('isValidGoogleDriveUrl', 'Invalid Google Drive URL!', (value) => {
          const regex = /https:\/\/drive\.google\.com\/drive\/folders\/(.*?)+/g;
          return regex.test(value!);
        })
        .default(null),
      'Roles': yup
        .array(
          yup.object({
            ID: yup
              .string()
              .trim()
              .required('Please enter an ID.')
              .default(null),
            Definition: yup
              .string()
              .trim()
              .required('Please enter a definition.')
              .default(null),
          })
        )
        .required('Please create at least 1 event role.')
        .default(null),
      'Official Event': yup
        .boolean()
        .required('Please select the event officiality.')
        .default(false),
      'updatedAt': yup
        .mixed<firestore.FieldValue>()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
      'createdAt': yup
        .mixed<firestore.FieldValue>()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
    });

export { FORM_SCHEMA_EVENT };
