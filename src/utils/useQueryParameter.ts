import { Dispatch, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

export function useQueryParameter<T>(
  name: string,
  fallbackValue: T,
  serialize: (value: T) => string,
  deserialize: (value: string) => T,
): [T, Dispatch<T>] {
  const history = useHistory();
  const location = useLocation();
  const [param, setParam] = useState<T>(fallbackValue);

  const setAndWriteQuery = (newValue: T) => {
    const params = new URLSearchParams(location.search);
    params.set(name, serialize(newValue));
    history.push({ search: params.toString() });
  };

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get(name);
    setParam(queryParam === null ? fallbackValue : deserialize(queryParam));
  }, [location]);

  return [param, setAndWriteQuery];
}

export function useNumberQueryParameter(name: string, fallbackValue: number): [number, Dispatch<number>] {
  const serialize = (value: number) => value.toString();
  const deserialize = (value: string) => (isNaN(+value) ? fallbackValue : +value);
  return useQueryParameter<number>(name, fallbackValue, serialize, deserialize);
}

export function usePageQueryParameter(name = 'page', fallbackValue = 1, min = 1): [number, Dispatch<number>] {
  const [page, setPage] = useNumberQueryParameter(name, fallbackValue);
  const clampedPage = Math.max(min, page);
  return [clampedPage, setPage];
}

export function usePageSizeQueryParameter(
  name = 'pageSize',
  fallbackValue = 10,
  min = 1,
  max = 100,
): [number, Dispatch<number>] {
  const [pageSize, setPageSize] = useNumberQueryParameter(name, fallbackValue);
  const clampedPageSize = Math.min(max, Math.max(min, pageSize));
  return [clampedPageSize, setPageSize];
}
