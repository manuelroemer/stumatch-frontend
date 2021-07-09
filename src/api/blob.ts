export function getBlobUrl(id: string) {
  return `${API_BASE_URL}/api/v1/blob/${id}`;
}

export function tryGetBlobUrl(id: string | undefined) {
  return id ? getBlobUrl(id) : undefined;
}
