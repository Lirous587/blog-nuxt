// 不需要进行服务端渲染
const apiCore = async (url, opt, authType) => {
  const config = useRuntimeConfig();

  const baseURL = config.public.apiBase;

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
      .catch(async (err) => {
        const errCode = err.statusCode;
        const errData = err?.data;
        if (errCode === 401) {
          if (refreshToken) {
            const data = fetchWithRefreshToken();
            resolve(data);
            return;
          } else {
            if (authType === "admin") {
              // removeAdminAccessToken();
              // removeAdminRefreshToken();
            } else {
              // removeUserAccessToken();
              // removeUserRefreshToken();
            }
          }
        }
        toast(errData || "未知错误", "error");
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
