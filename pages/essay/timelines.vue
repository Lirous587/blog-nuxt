<template>
  <div class="mx-auto flex flex-col gap-4 mt-5">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="flex flex-col gap-y-5">
          <div v-for="record in item.records" class="flex items-center gap-x-5">
            <NuxtLink :to="'/essay/' + record.id">
              <div class="font-bold text-lg text-pink-400 dark:text-yellow-600">
                {{ record.name }}
              </div>
            </NuxtLink>
            <el-text type="info">
              {{ formateDate(record.createdTime).split(" ")[0] }}
            </el-text>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
    <div ref="loadMoreTrigger" class="w-full flex items-center justify-center">
      <el-skeleton :rows="3" animated :loading="isLoadingMore"></el-skeleton>
    </div>
  </div>
</template>

<script setup>
import { getEssayTimelines } from "~/api/essay";

definePageMeta({
  scrollToTop: true,
});

const queryForm = reactive({
  page: 1,
  limit: 10,
});

const list = ref([]);

await getEssayTimelines(queryForm).then((res) => {
  const data = res.data;
  list.value = data;
});

const isLoadingMore = ref(false);
const ifHaveMore = ref(true);
const loadMoreTrigger = ref(null);

const loadMore = () => {
  //  1.正在加载的时候不去处理
  if (isLoadingMore.value || !ifHaveMore.value) {
    return;
  }

  isLoadingMore.value = true;
  queryForm.page += 1;
  getEssayTimelines(queryForm)
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length < queryForm.limit) {
        ifHaveMore.value = false;
      }
      if (!res) {
        ifHaveMore.value = false;
      }
      // 合并新数据到原列表
      list.value.push(...res.data);
    })
    .finally(() => {
      isLoadingMore.value = false;
    });
};

ScrollLoading(loadMoreTrigger, loadMore);
</script>
