import { useState, useEffect } from 'react';

import { Observable } from 'rxjs';

const useQuery = <T = null>(observable: Observable<T>) => {
  const [data, setData] = useState<T>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const sub = observable.subscribe(setData);

    return () => sub.unsubscribe();
  }, [observable]);

  return [data, error, loading];
};

export { useQuery };
