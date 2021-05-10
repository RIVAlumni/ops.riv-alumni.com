import * as yup from 'yup';
import { firestore } from 'firebase/app';

import {
  ONE_OF_GENDER,
  ONE_OF_GRADUATING_YEAR,
  ONE_OF_GRADUATING_CLASS,
} from '.';

export const FORM_SCHEMA_MEMBER = (docId: string) =>
  yup
    .object()
    .strict(true)
    .shape({
      'Membership ID': yup.string().required().trim().default(docId),
      'Full Name': yup
        .string()
        .trim()
        .required('Please enter a name.')
        .default(null),
      'Email': yup
        .string()
        .nullable()
        .optional()
        .trim()
        .email('Please enter a valid email address.')
        .default(null),
      'Gender': yup
        .string()
        .required()
        .oneOf(ONE_OF_GENDER, 'Please select a valid gender.')
        .default(ONE_OF_GENDER[0]),
      'Graduating Class': yup
        .string()
        .required()
        .oneOf(ONE_OF_GRADUATING_CLASS, 'Please select a valid class.')
        .default(ONE_OF_GRADUATING_CLASS[0]),
      'Graduating Year': yup
        .number()
        .required()
        .truncate()
        .oneOf(ONE_OF_GRADUATING_YEAR, 'Please select a valid year.')
        .typeError('Please enter a valid year.')
        .default(ONE_OF_GRADUATING_YEAR[0]),
      'Current School': yup.string().nullable().optional().trim().default(null),
      'Contact Number': yup
        .number()
        .truncate()
        .required('Please enter a number.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'Home Number': yup
        .number()
        .truncate()
        .optional()
        .nullable()
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'Name Of Next-Of-Kin': yup
        .string()
        .trim()
        .required('Please enter a name.')
        .default(null),
      'Relationship With Next-Of-Kin': yup
        .string()
        .trim()
        .required('Please enter a status.')
        .default(null),
      'Contact Number Of Next-Of-Kin': yup
        .number()
        .truncate()
        .required('Please enter a number.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'updatedAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
      'createdAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
    });

export const FORM_SCHEMA_EVENT = () =>
  yup
    .object()
    .strict(true)
    .shape({
      'Event Code': yup
        .number()
        .truncate()
        .required('Please enter the event code.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .test('len', 'Must be exactly 8 characters', (val) =>
          !val ? false : val.toString().length === 8
        )
        .default(null),
      'Event Year': yup
        .number()
        .truncate()
        .required('Event Year is missing.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .test('console', (test) => {
          console.log(test);
          return false;
        })
        .default(() => +yup.ref('Event Code').toString().substr(0, 3)),
      'Event Name': yup
        .string()
        .trim()
        .required('Please enter the event name.')
        .default(null),
      'Event Thumbnail': yup
        .string()
        .trim()
        .required('Please select an event thumbnail.')
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
      'Roles': yup.array(
        yup.object({
          ID: yup.string().trim().required('Please enter an ID.').default(null),
          Definition: yup
            .string()
            .trim()
            .required('Please enter a definition.')
            .default(null),
        })
      ),
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
