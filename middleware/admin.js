import { useMyAdminStore } from "~/store/admin";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const adminStore = useMyAdminStore();

  const ifInit = adminStore.getInitStatus();

  if (!ifInit) {
    await adminStore.updateAll();
  }

  return;
});
