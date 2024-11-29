export function getGalleryKindList() {
  return clientApi.get(`/admin/galleryKindList`);
}

export function createGalleryKind(form) {
  return clientApi.post(`/admin/galleryKind`, form);
}

export function updateGalleryKind(form) {
  return clientApi.put(`/admin/galleryKind`, form);
}

export function deleteGalleryKind(id) {
  return clientApi.delete(`/admin/galleryKind?id=${id}`);
}
