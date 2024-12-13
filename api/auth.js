export function login(form) {
  return clientApi.post("/admin/login", form);
}

export function adminAuth() {
  // return Client.post("/admin/auth");
}
