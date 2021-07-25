/**
 * An ID that typically represents the currently logged in user.
 * Can be provided to endpoints instead of the actual ID.
 */
export const me = 'me';

/**
 * The base attributes shared by every object returned by the REST API.
 */
export interface ApiObject {
  id: string;
  createdOn: string;
  modifiedOn: string;
}

/**
 * An aggregate interface of typical query parameters supported by
 * a variety of endpoints.
 *
 * No, throwing all of these into a single interface despite some endpoints
 * not supporting all of these is not clean.
 * Reason for doing this: It allows iterating on the prototype much more quickly.
 */
export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: string;
  lookingForJob?: boolean;
  search?: string;
}

/**
 * Special query options for endpoints supporting cursor pagination.
 */
export interface CursorPaginationQueryOptions<TCursor = unknown> {
  before?: TCursor;
  pageSize?: number;
}
