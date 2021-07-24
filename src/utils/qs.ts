/**
 * Serializes a given object to a URL query string.
 * @param obj The object to be converted to a URL query string.
 */
export function qs(obj?: any) {
  return new URLSearchParams(obj).toString();
}
