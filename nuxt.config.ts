import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  devtools: { enabled: true },

  ssr: true,

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/md-editor-v3@5.3.2/lib/style.css",
        },
        // 添加预览样式
        {
          rel: "stylesheet",
          href: "https://unpkg.com/md-editor-v3@5.3.2/lib/preview.css",
        },
      ],
      script: [
        {
          src: "https://unpkg.com/md-editor-v3@5.3.2/lib/umd/index.js",
          defer: true,
        },
      ],
    },
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

  modules: ["@element-plus/nuxt", "@pinia/nuxt"],

  css: ["~/assets/css/tailwind.css"],

  routeRules: {
    // 管理仪表板仅在客户端渲染
    "/admin/**": { ssr: false },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
  // postcss: {
  //   plugins: {
  //     cssnano: {
  //       plugins: [],
  //     },
  //   },
  // },
  elementPlus: {
    icon: "ElIcon",
    importStyle: "css",
    themes: ["dark"],
  },
});
