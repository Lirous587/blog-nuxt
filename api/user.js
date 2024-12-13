export function login(form) {
  return api.post("/user/login", form);
}

export function signup(form) {
  return api.post("/user/signup", form);
}

export function sentSignupValidationCode(form) {
  return api.post("/user/sentSignupValidationCode", form);
}

export function updateMsg(form) {
  return api.put("/user/updateMsg", form);
}

export function updatePassword(form) {
  return api.put("/user/updateMsg", form);
}

export function logout(form) {
  return api.delete("/user/updatePwd", form);
}

export function resetPassword(form) {
  return api.put("/user/resetPwd", form);
}

export function sentResetPasswordValidationCode(form) {
  return api.post("/user/sentResetPwdValidationCode", form);
}
