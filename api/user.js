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
  return clientApi.delete("/user/logout", {}, "user");
}

export function resetPassword(form) {
  return clientApi.put("/user/resetPwd", form);
}

export function sentResetPasswordValidationCode(form) {
  return clientApi.post("/user/sentResetPwdValidationCode", form);
}

export function userAuth() {
  return clientApi.get("/user/info", "user");
}
