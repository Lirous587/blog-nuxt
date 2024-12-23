import { useMyIndexStore } from "~/store/index";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const indexStore = useMyIndexStore();

  const ifInit = indexStore.getInitStatus();

  console.log(ifInit);

  if (!ifInit) {
    await indexStore.initData();
  }

  return;
});
