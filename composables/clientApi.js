// 不需要进行服务端渲染
const apiCore = async (url, opt, authType) => {
  const config = useRuntimeConfig();

  const nuxtApp = useNuxtApp();

  const baseURL = config.public.apiBase;

  let accessToken, refreshToken;
  if (authType === "admin") {
    accessToken = getAdminAccessToken();
    refreshToken = getAdminRefreshToken();
  } else if (authType === "user") {
    accessToken = getUserAccessToken();
    refreshToken = getUserRefreshToken();
  }

  const fetchWithRefreshToken = async () => {
    await $fetch(url, {
      method: opt.method || "get",
      retry: false,
      baseURL: baseURL,
      onRequest({ options }) {
        if (accessToken) {
          options.headers = {
            Authorization: `Bearer ${accessToken}`,
            "Refresh-Token": refreshToken,
            ...options.headers,
          };
        }
      },
      // refreshToken鉴权生效
      onResponse({ request, response, options }) {
        if (response.status >= 200 && response.status <= 300) {
          const newAccessToken = response._data.token;
          if (authType === "admin") {
            setAdminAccessToken(newAccessToken);
          } else if (authType === "user") {
            setUserAccessToken(newAccessToken);
          }
          accessToken = newAccessToken;
        }
      },
    });

    return new Promise(async (resolve, reject) => {
      // 发送原请求去拿 accessToken
      // 发送原请求去拿数据
      await $fetch(url, {
        method: opt.method || "get",
        retry: false,
        baseURL: baseURL,
        onRequest({ options }) {
          if (accessToken) {
            options.headers = {
              Authorization: `Bearer ${accessToken}`,
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
          reject(response._data);
        },
        ...opt,
      });
    });
  };

  return new Promise(async (resolve, reject) => {
    await $fetch(url, {
      method: opt.method || "get",
      retry: false,
      baseURL: baseURL,
      onRequest({ options }) {
        if (accessToken) {
          options.headers = {
            Authorization: `Bearer ${accessToken}`,
            ...options.headers,
          };
        }
      },
      async onResponse({ request, response, options }) {
        if (response.status >= 200 && response.status <= 300) {
          resolve(response._data);
        }
        if (response.status === 401) {
          if (refreshToken) {
            const data = await fetchWithRefreshToken();
            resolve(data);
          } else {
            toast("需要登录", "warning");
            nuxtApp.runWithContext(() => {
              navigateTo(authType === "admin" ? "/admin/auth" : "user/auth");
            });
            reject(response._data);
          }
        }
      },
      onResponseError({ request, response, options }) {
        reject(response._data);
      },
      ...opt,
    }).catch((err) => {
      reject(err);
    });
  });
};

const commonApi = (method, url, options, authType) => {
  if (import.meta.client) {
    return new Promise((resolve, reject) => {
      apiCore(
        url,
        {
          method,
          ...options,
        },
        authType
      )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export const clientApi = {
  get(url, options, authType = "admin") {
    return commonApi("GET", url, options, authType);
  },
  post(url, form, options = {}, authType = "admin") {
    return commonApi(
      "POST",
      url,
      {
        body: form,
        ...options,
      },
      authType
    );
  },
  put(url, form, options = {}, authType = "admin") {
    return commonApi(
      "PUT",
      url,
      {
        body: form,
        ...options,
      },
      authType
    );
  },
  delete(url, form, options = {}, authType = "admin") {
    return commonApi(
      "DELETE",
      url,
      {
        body: form,
        ...options,
      },
      authType
    );
  },
};
