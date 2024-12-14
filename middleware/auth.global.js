import { adminAuth } from "~/api/admin";

export default defineNuxtRouteMiddleware(async (to, from) => {
  let ifAuth = true;
  if (to.fullPath.includes("admin") && !to.fullPath.includes("auth")) {
    await adminAuth().catch((err) => {
      toast("你无管理员权限", "error");
      ifAuth = false;
    });
    if (!ifAuth) {
      return navigateTo("/");
    }
  }
});
