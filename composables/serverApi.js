// 不需要进行服务端渲染
const apiCore = async (url, opt, authType) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;
  const nuxtApp = useNuxtApp();

  let accessToken, refreshToken;
  if (authType === "admin") {
    accessToken = getAdminAccessToken();
    refreshToken = getAdminRefreshToken();
  } else if (authType === "user") {
    accessToken = getUserAccessToken();
    refreshToken = getUserRefreshToken();
  }

  const fetchWithRefreshToken = () => {
    return new Promise(async (resolve, reject) => {
      await useFetch(url, {
        method: opt.method || "get",
        retry: false,
        baseURL: baseURL,
        onRequest({ options }) {
          if (accessToken && refreshToken) {
            options.headers = {
              Authorization: `Bearer ${accessToken}`,
              "Refresh-Token": refreshToken,
              ...options.headers,
            };
          }
        },
      }).then((res) => {
        if (res.status.value === "success") {
          const newAccessToken = res.data.value.token;
          if (authType === "admin") {
            setAdminAccessToken(newAccessToken);
          } else if (authType === "user") {
            setUserAccessToken(newAccessToken);
          }
          accessToken = newAccessToken;
        } else {
          const err = res.error.value;
          const errData = err?.data;
          reject(errData || err);
        }
      });

      // 恢复现场
      await useFetch(url, {
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
        ...opt,
      }).then((res) => {
        if (res.status.value === "success") {
          resolve(res.data.value);
        } else {
          const err = res.error.value;
          const errData = err?.data;
          reject(errData || err);
        }
      });
    });
  };

  return new Promise(async (resolve, reject) => {
    await useFetch(url, {
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
      ...opt,
    }).then((res) => {
      if (res.status.value === "success") {
        resolve(res.data.value);
      } else {
        const err = res.error.value;
        const errCode = err.statusCode;
        const errData = err?.data;
        const errDataString = JSON.stringify(errData);

        if (errCode === 401) {
          if (refreshToken && accessToken) {
            fetchWithRefreshToken()
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                if (err.msg === "需要登录") {
                  if (authType === "admin") {
                    removeAdminAuth();
                  } else {
                    removeUserAuth();
                  }
                  nuxtApp.runWithContext(() => {
                    navigateTo("/");
                  });
                }

                toast(errDataString || "未知错误", "error");
                reject(errData || err);
              });
          }
          return;
        }
        toast(errDataString || "未知错误", "error");
        reject(errData || err);
      }
    });
  });
};

const commonApi = (method, url, authType) => {
  return new Promise((resolve, reject) => {
    apiCore(
      url,
      {
        method,
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
};

export const api = {
  get(url, authType = "admin") {
    return commonApi("GET", url, authType);
  },
  post(url, form, authType = "admin") {
    return commonApi(
      "POST",
      url,
      {
        body: form,
      },
      authType
    );
  },
  put(url, form, authType = "admin") {
    return commonApi(
      "PUT",
      url,
      {
        body: form,
      },
      authType
    );
  },
  delete(url, form, authType = "admin") {
    return commonApi(
      "DELETE",
      url,
      {
        body: form,
      },
      authType
    );
  },
};
