import { times } from 'lodash';
import { tap } from 'rxjs/operators';

export const count = <T>(label: string) =>
  tap<T>((value) =>
    value instanceof Array
      ? times(value.length, () => console.count(label))
      : console.count(label)
  );
