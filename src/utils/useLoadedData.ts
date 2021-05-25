import { DependencyList, useEffect, useState } from 'react';

export function useLoadedData<T, Error = any>(load: (signal: AbortSignal) => Promise<T>, deps?: DependencyList) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const reload = (signal: AbortSignal) => {
    setIsLoading(true);
    load(signal)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const ac = new AbortController();
    reload(ac.signal);
    return () => ac.abort();
  }, deps);

  return {
    isLoading,
    data,
    error,
    reload,
  };
}
