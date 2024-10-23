export default defineNuxtRouteMiddleware((to, from) => {
  if (Number.isNaN(parseInt(to.params.page))) {
    return abortNavigation();
  }
});
