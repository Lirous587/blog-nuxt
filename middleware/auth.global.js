import { adminAuth } from "~/api/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  let ifAuth = true;
  if (to.fullPath.includes("admin")) {
    await adminAuth().catch((err) => {
      toast("你无管理员权限");
      ifAuth = false;
    });
    if (!ifAuth) {
      return navigateTo("/");
    }
  }
});
