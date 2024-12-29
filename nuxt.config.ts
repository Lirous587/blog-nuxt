// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: true,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  devServer: {
    port: 3000,
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV === "production"
          ? "https://lirous.com/api/"
          : "http://127.0.0.1:8080/api/",
      imgGalleryBase:
        process.env.NODE_ENV === "production"
          ? "https://lirous.com/api/img/gallery/"
          : "http://127.0.0.1:8080/api/img/gallery/",
      imgAvatarBase:
        process.env.NODE_ENV === "production"
          ? "https://lirous.com/api/img/avatar/"
          : "http://127.0.0.1:8080/api/img/avatar/",
    },
  },
  modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/tailwind.css", "~/assets/scss/index.scss"],
  routeRules: {
    // 管理仪表板仅在客户端渲染
    "/admin/**": { ssr: false },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
});
