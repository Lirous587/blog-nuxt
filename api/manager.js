// 登录
export function login(form) {
  return clientApi.post("/manager/login", form);
}

// essay
export function createEssay(form) {
  return clientApi.post("/manager/createEssay", form);
}

export function updateEssay(form) {
  return clientApi.put("/manager/updateEssay", form);
}

export function deleteEssay(id) {
  return clientApi.delete(`/manager/deleteEssay?id=${id}`);
}

export function uploadImg(file) {
  const token = getToken();
  return new Promise((resolve, reject) => {
    clientApi
      .post("/manager/uploadImg", file, {
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
