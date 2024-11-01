export function login(form) {
  return clientApi.post("/admin/login", form);
}

export function getIndexPanel() {
  return clientApi.get("/admin/panel");
}

export function uploadImg(file) {
  const token = getToken();
  return new Promise((resolve, reject) => {
    clientApi
      .post("/admin/uploadImg", file, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast("上传成功");
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
