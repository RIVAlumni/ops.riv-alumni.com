import { useState, useEffect } from 'react';

import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';

import { mapEmpty } from '../pipes';

const useQuery = <T>(
  observable: Observable<T>
): [T | null, boolean, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [error] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sub = observable
      .pipe(
        timeout(5000),
        tap(() => setLoading(true)),
        mapEmpty(null),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  return [data, error, loading];
};

export { useQuery };
