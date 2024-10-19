export function getIndexInfo() {
  return api.get("/base/index");
}

export function getEssayList(form) {
  let q = queryToUrl(form);
  return api.get(`/base/essay_list${q}`);
}
