export function getCarouselList(query = {}) {
  let q = queryToUrl(query);
  return api.get(`/carousel${q}`);
}

export function createCarousel(form) {
  return clientApi.post(`/carousel`, form);
}

export function updateCarousel(id, form) {
  return clientApi.put(`/carousel/${id}`, form);
}

export function deleteCarousel(id) {
  return clientApi.delete(`/carousel/${id}`);
}
