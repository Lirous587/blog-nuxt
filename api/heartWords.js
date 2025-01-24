export function getHeartWordsList(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/heart-words${q}`);
}

export function createHeartWords(form) {
  return clientApi.post(`/heart-words`, form);
}

export function updateHeartWords(id, form) {
  return clientApi.put(`/heart-words/${id}`, form);
}

export function deleteHeartWords(id) {
  return clientApi.delete(`/heart-words/${id}`);
}
