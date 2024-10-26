export const getEssay = (id) => {
  return api.get(`/base/essay_content?id=${id}`);
};

export const getEssayList = (form) => {
  let q = queryToUrl(form);
  return api.get(`/base/essay_list${q}`);
};
