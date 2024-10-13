export function searchData(form) {
  return api.post(`/keyword/search`, form);
}

export function getSearchKeyCount() {
  return api.get("/keyword/search");
}
