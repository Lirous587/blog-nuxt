export const createEssayCommentParent = (form) => {
  return clientApi.post("/comment/createParent", form, "user");
};

export const createEssayCommentSon = (form) => {
  return clientApi.post("/comment/createSon", form, "user");
};

export const createEssayCommentReply = (form) => {
  return clientApi.post("/comment/createReply", form, "user");
};

export const deleteEssayComment = (form) => {
  return clientApi.delete("/comment/delete", form, "user");
};

export const getEssayCommentList = (eid) => {
  return clientApi.get(`/comment/list?eid=${eid}`);
};
