import { getEssayList } from "~/api/user";

// 将query参数转为url
export function queryToUrl(query) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return r;
}

export function formateDate(timeStr) {
  return timeStr.split("Z")[0].split("T").join(" ");
}

export function useCommonGetEssayList(queryForm) {
  const essayList = ref([]);
  const loading = ref(false);
  const totalPage = ref(1);

  const form = reactive({});

  for (const key in queryForm) {
    form[key] = queryForm[key];
  }

  const getList = async () => {
    await getEssayList(form)
      .then((res) => {
        const data = res.data;
        essayList.value = data.list;
        totalPage.value = data.totalPages;
      })
      .finally(() => {
        loading.value = true;
      });
  };

  return {
    getList,
    form,
    essayList,
    loading,
    totalPage,
  };
}
