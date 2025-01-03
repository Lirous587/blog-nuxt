export const getEssayCommentParents = (query) => {
  let q = queryToUrl(query);
  return clientApi.get(`/comment/parents${q}`);
};

export const getEssayCommentReplies = (query) => {
  let q = queryToUrl(query);
  return clientApi.get(`/comment/replies${q}`);
};

export const createEssayCommentParent = (form) => {
  return clientApi.post("/comment/parent", form, "user");
};

export const createEssayCommentReply = (form) => {
  return clientApi.post("/comment/reply", form, "user");
};

export const deleteEssayCommentParent = (form) => {
  return clientApi.delete("/comment/parent", form, "user");
};

export const deleteEssayCommentReply = (form) => {
  return clientApi.delete("/comment/reply", form, "user");
};
