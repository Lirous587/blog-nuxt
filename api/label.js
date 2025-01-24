export function createLabel(form) {
  return clientApi.post(`/essay/label`, form);
}

export function updateLabel(id, form) {
  return clientApi.put(`/essay/label/${id}`, form);
}

export function deleteLabel(id) {
  return clientApi.delete(`/essay/label/${id}`);
}
