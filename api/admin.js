// 登录
export function login(form) {
  return clientApi.post("/admin/login", form);
}

export function getIndexPanel() {
  return clientApi.get("/admin/panel");
}

export function createEssay(form) {
  return clientApi.post("/admin/createEssay", form);
}

export function updateEssay(form) {
  return clientApi.put("/admin/updateEssay", form);
}

export function deleteEssay(id) {
  return clientApi.delete(`/admin/deleteEssay?id=${id}`);
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
        ElMessage.success("上传成功");
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createKind(form) {
  return clientApi.post(`/admin/createKind`, form);
}

export function updateKind(form) {
  return clientApi.put(`/admin/updateKind`, form);
}

export function deleteKind(id) {
  return clientApi.delete(`/admin/deleteKind?id=${id}`);
}

export function createLabel(form) {
  return clientApi.post(`/admin/createLabel`, form);
}

export function updateLabel(form) {
  return clientApi.put(`/admin/updateLabel`, form);
}

export function deleteLabel(id) {
  return clientApi.delete(`/admin/deleteLabel?id=${id}`);
}
