import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface PostAuthTokenRequestBody {
  email: string;
  password: string;
}

export interface PostAuthTokenResponseBody {
  access_token: string;
  token_type: string;
}

export function postAuthToken(body: PostAuthTokenRequestBody, init?: StumatchFetchInit) {
  return stumatchFetch<PostAuthTokenResponseBody>('/api/v1/auth/token', { method: 'POST', body, ...init });
}
