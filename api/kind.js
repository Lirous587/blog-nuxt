export function createKind(form) {
  return clientApi.post(`/essay/kind`, form);
}

export function updateKind(id, form) {
  return clientApi.put(`/essay/kind/${id}`, form);
}

export function deleteKind(id) {
  return clientApi.delete(`/essay/kind/${id}`);
}
