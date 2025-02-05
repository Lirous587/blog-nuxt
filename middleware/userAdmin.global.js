export default defineNuxtRouteMiddleware((to, from) => {
  const status = userIfLogin();
  if (status && to.path === "/user/auth") {
    toast("你已登录");
    return navigateTo("/");
  }
  return;
});
