export function searchEssay(form) {
  return clientApi.post("/keyword/search", form);
}
