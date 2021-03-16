import * as Yup from 'yup';
import { range } from 'lodash';

export type SelectOptions<L, V = L> = {
  label: L;
  value: V;
  disabled?: boolean;
};

export const QUERY_LIMIT = 15;
export const MAX_VIA_HOURS = 9999;
export const MAX_EVENT_CODE = 99999999;

export const GENDER: SelectOptions<string>[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const GRADUATING_YEAR: SelectOptions<number>[] = range(
  new Date().getFullYear(),
  2000 - 1
).map((year) => ({ label: year, value: year }));

export const GRADUATING_CLASS: SelectOptions<string>[] = [
  { label: '6A', value: '6A' },
  { label: '6B', value: '6B' },
  { label: '6C', value: '6C' },
  { label: '6D', value: '6D' },
  { label: '6E', value: '6E' },
  { label: '6F', value: '6F' },
  { label: '6G', value: '6G' },
  { label: '6H', value: '6H' },
  { label: '6I', value: '6I' },
  { label: '6J', value: '6J' },
  { label: '6 Respect', value: '6 Respect' },
  { label: '6 Resilience', value: '6 Resilience' },
  { label: '6 Responsibility', value: '6 Responsibility' },
  { label: '6 Integrity', value: '6 Integrity' },
  { label: '6 Care', value: '6 Care' },
  { label: '6 Harmony', value: '6 Harmony' },
];

export const ONE_OF_GRADUATING_YEAR = GRADUATING_YEAR.map((object) =>
  Number(object.value)
);
export const ONE_OF_GRADUATING_CLASS = GRADUATING_CLASS.map(
  (object) => object.value
);

export const FORM_SCHEMA_USER = Yup.object({
  'Access Level': Yup.number().required().oneOf([0, 1, 2, 3]),
});

export const FORM_SCHEMA_MEMBER = Yup.object({
  'Full Name': Yup.string().required().trim(),
  'Email': Yup.string().optional().email().trim().nullable(),
  'Gender': Yup.string().required().oneOf(['Male', 'Female']),
  'Graduating Class': Yup.string().required().oneOf(ONE_OF_GRADUATING_CLASS),
  'Graduating Year': Yup.number().required().oneOf(ONE_OF_GRADUATING_YEAR),
  'Current School': Yup.string().optional().trim().nullable(),
  'Contact Number': Yup.number().required().integer().positive(),
  'Home Number': Yup.number().optional().nullable().integer().positive(),
  'Name Of Next-Of-Kin': Yup.string().required().trim().ensure(),
  'Relationship With Next-Of-Kin': Yup.string().required().trim().ensure(),
  'Contact Number Of Next-Of-Kin': Yup.number().required().integer().positive(),
});

export const FORM_SCHEMA_EVENT = Yup.object({
  'Event Name': Yup.string().required().uppercase().trim(),
  'Event Overall In-Charge': Yup.string().required().trim(),
  'Event Assistant In-Charge': Yup.string().required().trim(),
  'Google Drive': Yup.string().required().trim(),
  'Roles': Yup.array().of(
    Yup.object({
      ID: Yup.string().required().uppercase().trim(),
      Definition: Yup.string().required().trim(),
    })
  ),
  'Official Event': Yup.bool().required(),
});

export const FORM_SCHEMA_PARTICIPATION = Yup.object({
  'Role': Yup.string().required().uppercase().trim(),
  'VIA Hours': Yup.number().required().moreThan(-1),
});
