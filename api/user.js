export function getIndexInfo() {
  return api.get("/base/index");
}

export function getEssayList(form) {
  let q = queryToUrl(form);
  return axios.get(`/base/essay_list${q}`);
}

// export function getEssayMsg(id) {
//   return axios.get(`/base/essay_content?id=${id}`);
// }