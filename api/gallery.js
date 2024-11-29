export function getGalleryList(query) {
  let q = queryToUrl(query);
  return clientApi.get(`/admin/galleryList${q}`);
}

export function createGallery(form) {
  return clientApi.post(`/admin/gallery`, form);
}

export function updateGallery(form) {
  return clientApi.put(`/admin/gallery`, form);
}

export function deleteGallery(id) {
  return clientApi.delete(`/admin/gallery?id=${id}`);
}
