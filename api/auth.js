export function login(form) {
  return clientApi.post("/admin/login", form);
}

export async function adminAuth() {
  return api.get("/admin/auth");
}
