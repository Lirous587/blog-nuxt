<template>
  <div class="p-1 select-none">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="flex flex-col gap-y-5">
          <EssayList :list="item.records"></EssayList>
        </div>
      </el-timeline-item>
    </el-timeline>

    <el-skeleton
      :loading="isLoadingMore"
      animated
      :count="3"
      class="flex flex-col gap-y-5"
    >
      <template #template>
        <div class="flex justify-between px-5">
          <div class="flex flex-col gap-y-3">
            <el-skeleton-item variant="text" class="!ml-5 !w-[150px]" />
            <el-skeleton-item variant="text" class="!ml-5 !w-[120px]" />
            <el-skeleton-item variant="text" class="!ml-5 !w-[100px]" />
          </div>
          <el-skeleton-item
            variant="image"
            class="!h-[82px] !w-[128px] md:!h-[90px] md:!w-[160px] overflow-hidden !rounded-lg"
          />
        </div>
      </template>
    </el-skeleton>
    <div
      ref="loadMoreTrigger"
      class="w-full h-[50px] flex items-center justify-center"
    ></div>
  </div>
</template>

<script setup>
import { getEssayTimelines } from "~/api/essay";

definePageMeta({
  scrollToTop: true,
});

const queryForm = reactive({
  page: 1,
  limit: 5,
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

  let x;

  getEssayTimelines(queryForm).then((res) => {
    const data = res.data || [];
    if (Array.isArray(data) && data.length < queryForm.limit) {
      ifHaveMore.value = false;
    }
    if (!res) {
      ifHaveMore.value = false;
    }

    setTimeout(() => {
      isLoadingMore.value = false;
      list.value.push(...res.data);
    }, 500);
  });
};

ScrollLoading(loadMoreTrigger, loadMore);
</script>
