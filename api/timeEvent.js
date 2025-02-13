export function getTimeEventTimelines(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/timeEvent/timelines${q}`);
}

export function getTimeEventList(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/timeEvent${q}`);
}

export function createTimeEvent(form) {
  return clientApi.post(`/timeEvent`, form);
}

export function updateTimeEvent(id, form) {
  return clientApi.put(`/timeEvent/${id}`, form);
}

export function deleteTimeEvent(id) {
  return clientApi.delete(`/timeEvent/${id}`);
}
