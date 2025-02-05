import { adminAuth } from "~/api/admin";

let successInit = false;
export default defineNuxtRouteMiddleware(async (to, from) => {
  let ifAuth = true;

  if (to.fullPath.includes("admin") && !to.fullPath.includes("auth")) {
    await adminAuth()
      .then((res) => {
        if (!successInit) {
          toast("欢迎回来 我的主人", "success");
        }
        successInit = true;
      })
      .catch((err) => {
        toast("你无管理员权限", "error");
        ifAuth = false;
      });

    if (!ifAuth) {
      return navigateTo("/");
    }
  }

  return;
});
