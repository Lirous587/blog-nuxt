export function getFriendLinkList(query = {}) {
  let q = queryToUrl(query);
  return clientApi.get(`/friendLink/list${q}`, "admin");
}

export function createFriendLink(form) {
  return clientApi.post(`/friendLink`, form, "user");
}

export function updateFriendLink(id, form) {
  return clientApi.put(`/friendLink/${id}`, form, "user");
}

export function deleteFriendLink(id) {
  return clientApi.delete(`/friendLink/${id}`, "admin");
}

export function getFriendLink() {
  return clientApi.get(`/friendLink`, "user");
}

export function getFriendLinkRandom20() {
  return api.get(`/friendLink/random20`);
}
