import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface TokenPost {
  email: string;
  password: string;
}

export function postAuthToken(body: TokenPost, init?: StumatchFetchInit) {
  return stumatchFetch<TokenResponse>('/api/v1/auth/token', { method: 'POST', body, ...init });
}
