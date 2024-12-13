// 需要进行服务端渲染
const apiCore = async (url, opt) => {
  const config = useRuntimeConfig();

  const nuxtApp = useNuxtApp();

  let adminAccessToken;
  let adminRefreshToken;
  // let userAccessToken;
  // let userRefreshToken;
  adminAccessToken = getAdminAccessToken();
  console.log(adminAccessToken);

  adminRefreshToken = getAdminRefreshToken();
  console.log(adminRefreshToken);

  // userAccessToken = getUserAccessToken();
  // userRefreshToken = getUserRefreshToken();

  const fetchWithRefreshToken = async () => {
    return await useFetch(requestUrl, {
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
          console.log(response._data);
        }
      },
      // 鉴权失败
      onResponseError({ request, response, options }) {
        if (response.status === 401) {
          if (adminRefreshToken) {
            return fetchWithRefreshToken();
          }
        }
        if (response._data.msg === "需要登录") {
          toast("需要登录", "warning");
          // nuxtApp.runWithContext(() => {
          //   navigateTo("/admin/login");
          // });
        }
        if (import.meta.client) {
          toast(response?._data.msg || "未知错误", "error");
        }
      },
      ...opt,
    });
  };

  return await useFetch(url, {
    baseURL: config.public.apiBase,
    retry: false,
    onRequest({ options }) {
      let token = "";

      token = useCookie("auth_token").value;

      if (token) {
        options.headers = {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        };
      }
    },
    // onRequestError({ request, options, error }) {
    //   // Handle the request errors
    //   console.log("onRequestError" + error);
    // },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response.status >= 200 && response.status <= 300) {
        // console.log("服务端端请求");
        // console.log(response._data);
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      if (response._data.msg === "需要登录") {
        nuxtApp.runWithContext(() => {
          navigateTo("/login");
        });
      }

      if (import.meta.client) {
        ElMessage.error(response?._data.msg || "未知错误");
      }
    },
    ...opt,
  });
};

const commonApi = (method, url, options) => {
  return new Promise((resolve, reject) => {
    apiCore(url, {
      method,
      ...options,
    }).then((res) => {
      if (res.error.value) {
        reject(res.error.value.data);
      }
      resolve(res.data.value);
    });
  });
};

export const api = {
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
