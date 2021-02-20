import * as Yup from 'yup';
import { range } from 'lodash';

export const QUERY_LIMIT = 15;
export const MAX_VIA_HOURS = 9999;
export const MAX_EVENT_CODE = 99999999;

export const GRADUATING_CLASS = [
  '6A',
  '6B',
  '6C',
  '6D',
  '6E',
  '6F',
  '6G',
  '6H',
  '6I',
  '6J',
  '6 Respect',
  '6 Resilience',
  '6 Responsibility',
  '6 Integrity',
  '6 Care',
  '6 Harmony',
];

export const GRADUATING_YEAR = range(new Date().getFullYear(), 2000 - 1);

export const FORM_SCHEMA_MEMBER = Yup.object({
  'Full Name': Yup.string().required('Required Field').trim(),
  'Email': Yup.string().optional().email().trim().nullable(),
  'Gender': Yup.string().required('Required Field').oneOf(['Male', 'Female']),
  'Graduating Class': Yup.string()
    .required('Required Field')
    .oneOf(GRADUATING_CLASS),
  'Graduating Year': Yup.number()
    .required('Required Field')
    .oneOf(GRADUATING_YEAR)
    .integer()
    .positive(),
  'Current School': Yup.string().optional().trim().nullable(),
  'Contact Number': Yup.number()
    .required('Required Field')
    .integer()
    .positive(),
  'Home Number': Yup.number().optional().nullable().integer().positive(),
  'Name Of Next-Of-Kin': Yup.string()
    .required('Required Field')
    .trim()
    .ensure(),
  'Relationship With Next-Of-Kin': Yup.string()
    .required('Required Field')
    .trim()
    .ensure(),
  'Contact Number Of Next-Of-Kin': Yup.number()
    .required('Required Field')
    .integer()
    .positive(),
});
