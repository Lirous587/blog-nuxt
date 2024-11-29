export const getEssay = (id) => {
  return api.get(`/base/essayContent?id=${id}`);
};

export const getEssayList = (query) => {
  let q = queryToUrl(query);
  return api.get(`/base/essayList${q}`);
};

export function createEssay(form) {
  return clientApi.post("/admin/essay", form);
}

export function updateEssay(form) {
  return clientApi.put("/admin/essay", form);
}

export function deleteEssay(id) {
  return clientApi.delete(`/admin/essay?id=${id}`);
}
