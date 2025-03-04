export function getGalleryKindList(query = {}) {
  let q = queryToUrl(query);
  return clientApi.get(`/gallery/kind${q}`);
}

export function createGalleryKind(form) {
  return clientApi.post(`/gallery/kind`, form);
}

export function updateGalleryKind(id, form) {
  return clientApi.put(`/gallery/kind/${id}`, form);
}

export function deleteGalleryKind(id) {
  return clientApi.delete(`/gallery/kind/${id}`);
}
