import { stumatchFetch } from './fetch';

export interface PostAuthTokenRequestBody {
  email: string;
  password: string;
}

export interface PostAuthTokenResponseBody {
  token: string;
}

export function postAuthToken(body: PostAuthTokenRequestBody) {
  return stumatchFetch<PostAuthTokenResponseBody>('/api/v1/auth/token', { method: 'POST', body });
}
