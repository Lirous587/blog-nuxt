export function getEssayKindList(query = {}) {
  let q = queryToUrl(query);
  return clientApi.get(`/essay/kind${q}`);
}

export function createEssayKind(form) {
  return clientApi.post(`/essay/kind`, form);
}

export function updateEssayKind(id, form) {
  return clientApi.put(`/essay/kind/${id}`, form);
}

export function deleteEssayKind(id) {
  return clientApi.delete(`/essay/kind/${id}`);
}
