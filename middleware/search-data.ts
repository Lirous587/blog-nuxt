export default defineNuxtRouteMiddleware((to, from) => {
  // 检查是否是搜索页面
  if (to.path.includes("/search-data")) {
    // 检查 keyword 是否为空字符串或未定义
    if (to.query.keyword === "" || to.query.keyword === undefined) {
      if (import.meta.client) {
        ElMessage.warning("非法搜索");
      }
      // 如果来源不是搜索页面，则重定向到首页或其他适当的页面
      if (!from.path.includes("/search-data")) {
        return navigateTo(from.fullPath);
      }
      // 否则中止导航
      return abortNavigation();
    }
  }
  return;
});
