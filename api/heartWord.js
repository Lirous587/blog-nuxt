export function getHeartWordList(query = {}) {
  let q = queryToUrl(query);
  return clientApi.get(`/heartWord${q}`);
}

export function createHeartWord(form) {
  return clientApi.post(`/heartWord`, form);
}

export function updateHeartWord(id, form) {
  return clientApi.put(`/heartWord/${id}`, form);
}

export function deleteHeartWord(id) {
  return clientApi.delete(`/heartWord/${id}`);
}
