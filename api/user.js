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
  return clientApi.put("/user/updateMsg", form);
}

export function updatePassword(form) {
  return clientApi.put("/user/updateMsg", form);
}

export function logout(form) {
  return clientApi.delete("/user/updatePwd", form);
}

export function resetPassword(form) {
  return clientApi.put("/user/resetPwd", form);
}

export function sentResetPasswordValidationCode(form) {
  return clientApi.post("/user/sentResetPwdValidationCode", form);
}
