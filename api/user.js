export function login(form) {
  return clientApi.post("/user/login", form);
}

export function signup(form) {
  return clientApi.post("/user/signup", form);
}

export function sentSignupValidationCode(form) {
  return clientApi.post("/user/sentSignupValidationCode", form);
}

export function updateMsg(form) {
  return clientApi.put("/user/updateMsg", form, "user");
}

export function updatePassword(form) {
  return clientApi.put("/user/updatePwd", form, "user");
}

export function logout() {
  return clientApi.delete("/user/logout", "user");
}

export function resetPassword(form) {
  return clientApi.put("/user/resetPwd", form);
}

export function sentResetPasswordValidationCode(form) {
  return clientApi.post("/user/sentResetPwdValidationCode", form);
}

export function getUserInfo() {
  return clientApi.get("/user/info", "user");
}

export function createUser(form) {
  return clientApi.post("/user", form, "admin");
}

export function updateUser(id, form) {
  return clientApi.put(`/user/${id}`, form, "admin");
}

export function getUserList(query) {
  const q = queryToUrl(query);
  return clientApi.get(`/user${q}`, "admin");
}

export function userAuth() {
  return clientApi.get("/user/auth", "user");
}

export function downLine(id) {
  return clientApi.delete(`user/${id}`, "admin");
}
