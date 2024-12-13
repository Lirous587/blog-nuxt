// 不需要进行服务端渲染
const apiCore = async (url, opt) => {
  const config = useRuntimeConfig();

  const nuxtApp = useNuxtApp();

  const requestUrl = config.public.apiBase + url;

  let adminAccessToken;
  let adminRefreshToken;
  // let userAccessToken;
  // let userRefreshToken;
  adminAccessToken = getAdminAccessToken();
  adminRefreshToken = getAdminRefreshToken();
  // userAccessToken = getUserAccessToken();
  // userRefreshToken = getUserRefreshToken();

  const fetchWithRefreshToken = async () => {
    await $fetch(requestUrl, {
      method: opt.method || "get",
      retry: false,
      onRequest({ options }) {
        if (adminAccessToken) {
          options.headers = {
            Authorization: `Bearer ${adminAccessToken}`,
            "Refresh-Token": adminRefreshToken,
            ...options.headers,
          };
        }
      },
      // refreshToken鉴权生效
      onResponse({ request, response, options }) {
        if (response.status >= 200 && response.status <= 300) {
          const newAccessToken = response._data.token;
          setAdminAccessToken(newAccessToken);
          adminAccessToken = newAccessToken;
        }
      },
      // 鉴权失败
      onResponseError({ request, response, options }) {
        // toast("需要登录", "warning");
        // nuxtApp.runWithContext(() => {
        //   navigateTo("/admin/login");
        // });
      },
      ...opt,
    });
    return new Promise(async (resolve, reject) => {
      // 发送原请求去拿 accessToken
      // 发送原请求去拿数据
      await $fetch(requestUrl, {
        method: opt.method || "get",
        retry: false,
        onRequest({ options }) {
          if (adminAccessToken) {
            options.headers = {
              Authorization: `Bearer ${adminAccessToken}`,
              ...options.headers,
            };
          }
        },
        onResponse({ request, response, options }) {
          if (response.status >= 200 && response.status <= 300) {
            const data = response._data;
            resolve(data);
          }
        },
        onResponseError({ request, response, options }) {
          reject(response);
        },
        ...opt,
      });
    });
  };

  return new Promise((resolve, reject) => {
    $fetch(requestUrl, {
      method: opt.method || "get",
      retry: false,
      onRequest({ options }) {
        if (adminAccessToken) {
          options.headers = {
            Authorization: `Bearer ${adminAccessToken}`,
            ...options.headers,
          };
        }
      },
      onResponse({ request, response, options }) {
        if (response.status >= 200 && response.status <= 300) {
          // console.log("客户端请求");
          // console.log(response._data);
          resolve(response._data);
        }
      },
      async onResponseError({ request, response, options }) {
        // token 过期
        // 携带refreshToken 发一次相同请求 获取到token
        // 再用token发一次请求
        if (response.status === 401) {
          if (adminRefreshToken) {
            const data = await fetchWithRefreshToken();
            resolve(data);
          } else {
            toast("需要登录", "warning");
            // nuxtApp.runWithContext(() => {
            //   navigateTo("/admin/login");
            // });
            reject(response);
          }
        } else if (response._data.msg === "需要登录") {
          toast("需要登录", "warning");
          nuxtApp.runWithContext(() => {
            navigateTo("/admin/login");
          });
          reject(response);
        } else {
          toast(response?._data.msg || "未知错误", "error");
          reject(response);
        }
      },
      ...opt,
    });
  });
};

const commonApi = (method, url, options) => {
  if (import.meta.client) {
    return new Promise((resolve, reject) => {
      apiCore(url, {
        method,
        ...options,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};

export const clientApi = {
  get(url, options) {
    return commonApi("GET", url, options);
  },
  post(url, form, options = {}) {
    return commonApi("POST", url, {
      body: form,
      ...options,
    });
  },
  put(url, form, options = {}) {
    return commonApi("PUT", url, {
      body: form,
      ...options,
    });
  },
  delete(url, form, options = {}) {
    return commonApi("DELETE", url, {
      body: form,
      ...options,
    });
  },
};
