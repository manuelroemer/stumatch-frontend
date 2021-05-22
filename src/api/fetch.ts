import { useButtonGroup } from '@chakra-ui/button';
import { useUserStore } from '../stores/userStore';

const apiBaseUrl = API_BASE_URL;

export interface StumatchFetchInit extends Omit<Omit<RequestInit, 'body'>, 'headers'> {
  /**
   * The body to be sent with the request.
   * This is recommended to be a native object. If so, `stumatchFetch` will convert the object to JSON.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: BodyInit | object | null;
  headers?: Record<string, string>;
}

export interface StumatchFetchResponse<T = unknown> extends Response {
  /**
   * Deserialized JSON data from the response.
   */
  readonly data: T;
}

/**
 * Thrown by `stumatchFetch` if a request resulted in a non-sucessful status code.
 */
export class StumatchFetchError extends Error {
  constructor(
    public response: StumatchFetchResponse,
    message = `API request failed with status ${response.status} ${response.statusText} for "${response.url}".`,
  ) {
    super(message);
  }
}

/**
 * A specialized `fetch` function for interacting specifically with the sTUMatch API.
 * In comparison to the default `fetch`, this function does the following:
 *
 * * Works with relative URLs (such as `/api/v1/example`) by automatically appending the API's base URL.
 * * Rejects for non-sucessful status codes.
 * * Supports native objects as the body (will be converted to JSON).
 * * Parses JSON responses.
 * * If a user is signed in, automatically uses the user's token for API requests.
 * @param url The relative URL of the sTUMatch API endpoint to be invoked. Example: `/api/v1/example`.
 * @param init Optional initialization data for the request to be made.
 * @returns The response to the request.
 * @throws
 *  {@link StumatchFetchError} if the request failed with a non-successful status code.
 *  {@link Error} if the request failed for other reasons (e.g. missing network connection).
 */
export async function stumatchFetch<T = unknown>(
  url: string,
  init: StumatchFetchInit = {},
): Promise<StumatchFetchResponse<T>> {
  if (!apiBaseUrl) {
    throw new Error(
      'The API base URL is not defined. This is most likely due to an issue in the webpack configuration.',
    );
  }

  init.headers = init.headers ?? {};

  if (typeof init.body === 'object') {
    init.body = JSON.stringify(init.body);

    if (init.headers['Content-Type'] === undefined) {
      init.headers['Content-Type'] = 'application/json';
    }
  }

  const token = useUserStore.getState().userInfo?.token;
  if (token && init.headers['Authorization'] === undefined) {
    init.headers['Authorization'] = `Bearer ${token}`;
  }

  const fullUrl = getStumatchApiUrl(url).href;
  const response = (await fetch(fullUrl, init as RequestInit)) as Response & { data: T };
  response.data = await tryParseJsonBody(response);

  if (response.ok) {
    return response;
  } else {
    throw new StumatchFetchError(response);
  }
}

function getStumatchApiUrl(apiUrlSegment: string) {
  return new URL(apiUrlSegment, apiBaseUrl);
}

async function tryParseJsonBody(response: Response) {
  try {
    return await response.json();
  } catch (e) {
    return undefined;
  }
}
