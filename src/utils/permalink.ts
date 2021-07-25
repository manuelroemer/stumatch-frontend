export function generatePermalinkForCurrentPage(suffix = '') {
  return window.location.origin + window.location.pathname + suffix;
}
