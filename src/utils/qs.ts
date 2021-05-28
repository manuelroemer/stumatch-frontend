export function qs(obj?: any) {
  return new URLSearchParams(obj).toString();
}
