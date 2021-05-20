const apiBaseUrl = API_BASE_URL;

export interface StumatchFetchInit extends Omit<Omit<RequestInit, 'body'>, 'headers'> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  body?: BodyInit | object | null;
  headers?: Record<string, string>;
}

export interface StumatchFetchResponse<T = unknown> extends Response {
  readonly data: T;
}

export class StumatchFetchError extends Error {
  constructor(
    public response: StumatchFetchResponse,
    message = `API request failed with status ${response.status} ${response.statusText} for "${response.url}".`,
  ) {
    super(message);
  }
}

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
