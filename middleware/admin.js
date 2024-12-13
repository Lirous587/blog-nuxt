import { useMyAdminStore } from "~/store/admin";

export default defineNuxtRouteMiddleware(async (to, from) => {

  const adminStore = useMyAdminStore();

  const ifInit = adminStore.getInitStatus();

  if (!ifInit) {
    await adminStore.updateAll();
  }

  return;

  // needTokenRequest().catch((err) => {
  //   if (err === "需要登录") {
  //     const nuxtApp = useNuxtApp();
  //     nuxtApp.runWithContext(() => {
  //       navigateTo({
  //         path: "/login",
  //       });
  //     });
  //   }
  // });
});
