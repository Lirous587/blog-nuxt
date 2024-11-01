export function createLabel(form) {
  return clientApi.post(`/admin/label`, form);
}

export function updateLabel(form) {
  return clientApi.put(`/admin/label`, form);
}

export function deleteLabel(id) {
  return clientApi.delete(`/admin/label?id=${id}`);
}
