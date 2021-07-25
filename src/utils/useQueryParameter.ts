import { Dispatch, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

/**
 * A hook which essentially works like {@link useState}, but which additionally
 * binds the value to the current URL as a query parameter.
 *
 * This is the "handle-all" hook which requires information about how to
 * (de-)serialize the values from/to query parameters.
 * Use more specific hooks leveraging this one for easier integration.
 * @param name The name of the query parameter as it should appear in the URL.
 * @param fallbackValue A value to be used when serialization fails and when no value can be read from the URL.
 * @param serialize Serializes a value to a string (which can appear in the URL).
 * @param deserialize Deserializes a query parameter string to the actual value which can be used.
 */
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

/**
 * A hook which essentially works like {@link useState}, but which additionally
 * binds the string value to the current URL as a query parameter.
 * @param name The name of the query parameter as it should appear in the URL.
 * @param fallbackValue A value to be used when serialization fails and when no value can be read from the URL.
 */
export function useStringQueryParameter(name: string, fallbackValue: string): [string, Dispatch<string>] {
  return useQueryParameter<string>(
    name,
    fallbackValue,
    (s) => s,
    (s) => s,
  );
}

/**
 * A hook which essentially works like {@link useState}, but which additionally
 * binds the number value to the current URL as a query parameter.
 * @param name The name of the query parameter as it should appear in the URL.
 * @param fallbackValue A value to be used when serialization fails and when no value can be read from the URL.
 */
export function useNumberQueryParameter(name: string, fallbackValue: number): [number, Dispatch<number>] {
  const serialize = (value: number) => value.toString();
  const deserialize = (value: string) => (isNaN(+value) ? fallbackValue : +value);
  return useQueryParameter<number>(name, fallbackValue, serialize, deserialize);
}

/**
 * A hook which essentially works like {@link useState}, but which additionally
 * binds the value to the current URL as a query parameter.
 *
 * This hook is specifically used to bind a "page" parameter as it is used for pagination
 * within the app.
 * @param name The name of the query parameter as it should appear in the URL.
 * @param fallbackValue A value to be used when serialization fails and when no value can be read from the URL.
 * @param min The minimum allowed page value.
 */
export function usePageQueryParameter(name = 'page', fallbackValue = 1, min = 1): [number, Dispatch<number>] {
  const [page, setPage] = useNumberQueryParameter(name, fallbackValue);
  const clampedPage = Math.max(min, page);
  return [clampedPage, setPage];
}

/**
 * A hook which essentially works like {@link useState}, but which additionally
 * binds the value to the current URL as a query parameter.
 *
 * This hook is specifically used to bind a "pageSize" parameter as it is used for pagination
 * within the app.
 * @param name The name of the query parameter as it should appear in the URL.
 * @param fallbackValue A value to be used when serialization fails and when no value can be read from the URL.
 * @param min The minimum allowed page size value.
 * @param max The maximum allowed page size value.
 */
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
