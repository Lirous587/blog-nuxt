export const getEssay = (id) => {
  return api.get(`/essay/${id}`);
};

export const getEssayList = (query) => {
  let q = queryToUrl(query);
  return api.get(`/essay${q}`);
};

export function createEssay(form) {
  return clientApi.post("/essay", form);
}

export function updateEssay(id, form) {
  return clientApi.put(`/essay/${id}`, form);
}

export function deleteEssay(id) {
  return clientApi.delete(`/essay/${id}`);
}

export function searchEssay(form) {
  return clientApi.post("/base/essaySearch", form);
}

export function getEssayTimelines(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/essay/timelines${q}`);
}
