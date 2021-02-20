import { isEmpty } from 'lodash';
import { map } from 'rxjs/operators';

export const mapEmpty = <T>(emptyValue: any) =>
  map<T, any>((data) => (isEmpty(data) ? emptyValue : data));
