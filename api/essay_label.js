export function getEssayLabelList(query = {}) {
  let q = queryToUrl(query);
  return clientApi.get(`/essay/label${q}`);
}

export function createEssayLabel(form) {
  return clientApi.post(`/essay/label`, form);
}

export function updateEssayLabel(id, form) {
  return clientApi.put(`/essay/label/${id}`, form);
}

export function deleteEssayLabel(id) {
  return clientApi.delete(`/essay/label/${id}`);
}
