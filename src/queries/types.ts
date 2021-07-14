/**
 * Parameters typically passed to a PUT mutation.
 * Those usually require an ID and a body.
 */
export interface PutMutationData<T> {
  id: string;
  body: T;
}
