export function getGalleryList(query) {
  let q = queryToUrl(query);
  return clientApi.get(`/gallery${q}`);
}

export function createGallery(form) {
  return clientApi.post(`/gallery`, form);
}

export function updateGallery(id, form) {
  return clientApi.put(`/gallery/${id}`, form);
}

export function deleteGallery(id) {
  return clientApi.delete(`/gallery/${id}`);
}
