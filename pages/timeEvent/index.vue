<template>
  <div class="mx-auto flex flex-col gap-4 mt-5">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mr-2">
          <div v-for="record in item.records">
            <el-card
              shadow="hover"
              class="min-w-[300px] overflow-hidden relative hover:!shadow-lg transition-all duration-300 transform mb-4"
            >
              <div class="flex justify-between">
                <div class="font-bold text-pink-400 dark:text-yellow-600">
                  {{ record.topic }}
                </div>

                <el-link
                  :href="getLink(record.relatedLink)"
                  target="_blank"
                  :underline="true"
                >
                  <span class="font-bold text-pink-400 dark:text-blue-600">
                    {{ record.relatedLink ? "相关链接" : "" }}
                  </span>
                </el-link>
              </div>

              <div
                class="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] overflow-auto mt-1"
              >
                <el-image
                  class="float-left select-none w-[120px] sm:w-[140px] md:w-[150px] h-full rounded-md shadow-2xs ease-in-out dark:opacity-60 transition-all duration-500 mr-2"
                  :src="imgPre + record.img.url"
                  lazy
                  fit="cover"
                />
                <small class="block mt-2 text-pink-400">
                  {{ record.introduction }}
                </small>
              </div>
            </el-card>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>

    <el-skeleton
      class="pl-10 !grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mr-2"
      :loading="isLoadingMore"
      animated
      :count="3"
    >
      <template #template>
        <div>
          <el-skeleton-item variant="text" class="!w-[80px]" />
          <div class="flex">
            <el-skeleton-item
              variant="image"
              class="!h-[180px] sm:!h-[200px] md:!h-[220px] lg:!h-[250px] !w-[120px] sm:!w-[140px] md:!w-[150px] overflow-auto"
            />
            <div>
              <el-skeleton-item variant="text" class="!ml-[20px] !w-[100px]" />
              <br />
              <el-skeleton-item variant="text" class="!ml-[20px] !w-[100px]" />
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

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;

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
