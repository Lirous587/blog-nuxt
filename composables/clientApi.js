// 不需要进行服务端渲染
const apiCore = (url, opt, authType) => {
  const config = useRuntimeConfig();

  const baseURL = config.public.apiBase;

  let accessToken, refreshToken;

  if (authType === "both") {
    authType = "admin";
    accessToken = getAdminAccessToken();
    refreshToken = getAdminRefreshToken();
    if (!accessToken || !refreshToken) {
      accessToken = getUserAccessToken();
      refreshToken = getUserRefreshToken();
      authType = "user";
    }
  } else if (authType === "admin") {
    accessToken = getAdminAccessToken();
    refreshToken = getAdminRefreshToken();
  } else if (authType === "user") {
    accessToken = getUserAccessToken();
    refreshToken = getUserRefreshToken();
  }

  const fetchWithRefreshToken = () => {
    return new Promise(async (resolve, reject) => {
      await $fetch(url, {
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
      })
        .then((res) => {
          const newAccessToken = res.token;
          if (authType === "admin") {
            setAdminAccessToken(newAccessToken);
          } else if (authType === "user") {
            setUserAccessToken(newAccessToken);
          }
          accessToken = newAccessToken;
        })
        .catch((err) => {
          const errData = err?.data;
          reject(errData || err);
        });

      // 恢复现场
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
        ...opt,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const errData = err?.data;
          reject(errData || err);
        });
    });
  };

  return new Promise(async (resolve, reject) => {
    await $fetch(url, {
      method: opt.method || "get",
      retry: true,
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
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
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
                if (authType === "admin") {
                  removeAdminAuth();
                } else {
                  removeUserAuth();
                }
                toast(err?.msg || "未知错误", "error");
                reject(err);
              });
          } else {
            if (authType === "admin") {
              removeAdminAuth();
            } else if (authType === "user") {
              removeUserAuth();
            }
            reject(errData || err);
          }
          return;
        }
        toast(errDataString || "未知错误", "error");
        reject(errData || err);
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
  get(url, authType = "admin") {
    return commonApi("GET", url, {}, authType);
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
  delete(url, authType = "admin") {
    return commonApi("DELETE", url, {}, authType);
  },
};
