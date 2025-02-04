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

export const deleteEssayCommentParent = (eid, id) => {
  return clientApi.delete(`/comment/parent/${eid}/${id}`, "both");
};

export const deleteEssayCommentReply = (pid, id) => {
  return clientApi.delete(`/comment/reply/${pid}/${id}`, "both");
};
