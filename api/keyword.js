export function searchData(form) {
  return clientApi.post("/keyword/search", form);
}
