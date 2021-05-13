import * as yup from 'yup';
import { firestore } from 'firebase/app';

const FORM_SCHEMA_EVENT = () =>
  yup
    .object()
    .strict(true)
    .shape({
      /**
       * Staging fields to be removed from final output.
       */
      '_Event Code': yup.string().strip(),
      '_Event Thumbnail': yup.string().strip(),

      /**
       * Actual fields to be in the final output.
       */
      'Event Code': yup
        .number()
        .truncate()
        .required('Please select the event date.')
        .integer('Please select a valid event date.')
        .positive('Please select a valid event date.')
        .typeError('Please select a valid event date.')
        .default(null),
      'Event Year': yup
        .number()
        .truncate()
        .required('Event Year is missing.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'Event Name': yup
        .string()
        .trim()
        .required('Please enter the event name.')
        .transform((value: string) => value.toUpperCase())
        .default(null),
      'Event Thumbnail': yup
        .mixed()
        .required('Please select an event thumbnail.')
        .test(
          'file_size',
          'Event Thumbnail is too large!',
          (value) => value && value[0].size <= 1000000
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
      'Official Event': yup.boolean().required().default(false),
      'updatedAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
      'createdAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
    });

export { FORM_SCHEMA_EVENT };
