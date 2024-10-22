export const getEssay = (id) => {
  return api.get(`/base/essay_content?id=${id}`);
};
