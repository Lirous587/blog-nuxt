import { useMyIndexStore } from "~/store/index";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const indexStore = useMyIndexStore();

  const ifInit = indexStore.getInitStatus();

  if (!ifInit) {
    await indexStore.initData();
  }

  return;
});
