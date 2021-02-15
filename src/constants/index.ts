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
