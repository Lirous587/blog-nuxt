export function getHeartWordsList(query) {
  let q = queryToUrl(query);
  return api.get(`/base/heartWordsList${q}`);
}

export function createHeartWords(form) {
  return clientApi.post(`/admin/heartWords`, form);
}

export function updateHeartWords(form) {
  return clientApi.put(`/admin/heartWords`, form);
}

export function deleteHeartWords(id) {
  return clientApi.delete(`/admin/heartWords?id=${id}`);
}
