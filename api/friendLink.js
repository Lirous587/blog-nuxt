export function getFriendLinkList(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/friendLink${q}`);
}

export function createFriendLink(form) {
  return clientApi.post(`/friendLink`, form, "both");
}

export function updateFriendLink(id, form) {
  return clientApi.put(`/friendLink/${id}`, form, "both");
}

export function deleteFriendLink(id) {
  return clientApi.delete(`/friendLink/${id}`, "both");
}
