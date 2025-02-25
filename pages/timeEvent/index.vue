<template>
  <div class="flex flex-col mt-5">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="flex flex-col gap-y-3">
          <el-card
            v-for="record in item.records"
            shadow="hover"
            class="min-w-[300px] overflow-hidden relative hover:!shadow-lg transition-all duration-300 transform"
          >
            <div class="flex flex-col gap-y-2 mb-3">
              <div class="font-bold text-lg text-blue-400 dark:text-yellow-600">
                {{ record.topic }}
              </div>
              <small
                class="text-gray-400 line-clamp-2"
                :title="record.introduction"
              >
                {{ record.introduction }}
              </small>
            </div>

            <div class="max-h-[350px] overflow-auto">
              <MdPreview
                class="text-xs"
                :previewTheme="record.theme"
                :content="record.content"
              ></MdPreview>
            </div>
          </el-card>
        </div>
      </el-timeline-item>
    </el-timeline>

    <el-skeleton class="pl-10" :loading="ifHaveMore" animated :count="2">
      <template #template>
        <div class="flex flex-col gap-y-3 my-3">
          <el-skeleton-item variant="text" class="!w-[180px]" />
          <el-skeleton-item variant="text" class="!w-[280px]" />
          <div class="flex">
            <el-skeleton-item
              variant="image"
              class="!h-[90px] sm:!h-[160px] lg:!h-[180px] !w-[320px] !rounded-lg"
            />
            <div class="flex flex-col gap-y-3 ml-4">
              <el-skeleton-item variant="text" class="!w-[180px]" />
              <el-skeleton-item variant="text" class="!w-[280px]" />
              <el-skeleton-item variant="text" class="!w-[280px]" />
            </div>
          </div>
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
import { getTimeEventTimelines } from "~/api/timeEvent";

definePageMeta({
  scrollToTop: true,
});

const queryForm = reactive({
  page: 1,
  limit: 5,
});

const list = ref([]);

await getTimeEventTimelines(queryForm).then((res) => {
  const data = res.data;
  list.value = data;
});

const isLoadingMore = ref(false);
const ifHaveMore = ref(true);
const loadMoreTrigger = ref(null);

const loadMore = () => {
  //  1.正在加载的时候或者没有数据了就不去处理
  if (isLoadingMore.value || !ifHaveMore.value) {
    return;
  }

  isLoadingMore.value = true;
  queryForm.page += 1;
  getTimeEventTimelines(queryForm).then((res) => {
    const data = res.data || [];
    if (Array.isArray(data) && data.length < queryForm.limit) {
      ifHaveMore.value = false;
    }
    if (!res) {
      ifHaveMore.value = false;
    }
    setTimeout(() => {
      isLoadingMore.value = false;
      list.value.push(...data);
    }, 800);
  });
};

ScrollLoading(loadMoreTrigger, loadMore);
</script>
