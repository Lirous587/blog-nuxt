const apiCore = (url, opt) => {
  const config = useRuntimeConfig();

  const apiFun = () => {
    if (import.meta.client) {
      return useFetch;
    } else {
      return $fetch;
    }
  };

  const nuxtApp = useNuxtApp();

  return apiFun()(url, {
    baseURL: config.public.apiBase,
    retry: false,
    onRequest({ options }) {
      let token = "";
      if (import.meta.client) {
        token = localStorage.getItem("token");
      }
      if (token) {
        options.headers = {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        };
      }
    },
    // onRequestError({ request, options, error }) {
    //   // Handle the request errors
    //   console.log(error);
    // },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response.status >= 200 && response.status <= 300) {
        console.log(response._data);
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      nuxtApp.runWithContext(() => {
        navigateTo("/login");
      });
      if (import.meta.client) {
        ElMessage({
          message: response?._data.msg || "未知错误",
          type: "error",
        });
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
      if (res.status.value === "success") {
        resolve(res.data.value);
      } else {
        if (res.error.value?.data) {
          reject(res.error.value.data?.msg || res.error.value);
        } else {
          reject(res.error.value);
        }
      }
    });
  });
};

const disposeReactive = (form) => {
  let data = {};
  for (const key in form) {
    data[key] = form[key];
  }
  return data;
};

export const api = {
  get(url, options) {
    return commonApi("GET", url, options);
  },
  post(url, form, options = {}) {
    const formData = disposeReactive(form);
    return commonApi("POST", url, {
      body: formData,
      ...options,
    });
  },
  put(url, form, options = {}) {
    const formData = disposeReactive(form);
    return commonApi("PUT", url, {
      body: formData,
      ...options,
    });
  },
  delete(url, form, options = {}) {
    const formData = disposeReactive(form);
    return commonApi("DELETE", url, {
      body: formData,
      ...options,
    });
  },
};
