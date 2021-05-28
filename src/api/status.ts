import { stumatchFetch, StumatchFetchInit } from './fetch';

export function getStatus(init?: StumatchFetchInit) {
  return stumatchFetch<undefined>('/status', init);
}
