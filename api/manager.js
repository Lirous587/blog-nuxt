// 登录
export function login(form) {
  return clientApi.post("/manager/login", form);
}

// kind
export function updateKind(form) {
  return clientApi.put("/manager/updateKind", form);
}

// classify
export function updateClassify(form) {
  return clientApi.put("/manager/updateClassify", form);
}

export function createClassify(form) {
  return clientApi.post("/manager/addClassify", form);
}

// essay
export function createEssay(form) {
  return clientApi.post("/manager/addEssay", form);
}

export function updateEssayMsg(form) {
  return clientApi.put("/manager/updateEssayMsg", form);
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
