export function createKind(form) {
  return clientApi.post(`/admin/kind`, form);
}

export function updateKind(form) {
  return clientApi.put(`/admin/kind`, form);
}

export function deleteKind(id) {
  return clientApi.delete(`/admin/kind?id=${id}`);
}
