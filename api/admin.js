export function adminLogin(form) {
  return clientApi.post("/admin/login", form);
}

export function adminAuth() {
  return api.get("/admin/auth");
}
