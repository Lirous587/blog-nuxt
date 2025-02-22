<template>
  <div class="p-1 select-none">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="flex flex-col gap-y-5">
          <div v-for="record in item.records">
            <div class="flex" :to="'/essay/' + record.id">
              <NuxtLink class="flex items-center" :to="'/essay/' + record.id">
                <el-image
                  :src="imgPre + record.img.url"
                  lazy
                  :fit="cover"
                  class="h-[63px] w-[112px] md:h-[90px] md:w-[160px] overflow-hidden rounded-lg"
                ></el-image>
              </NuxtLink>

              <div class="ml-4 flex flex-col gap-y-1">
                <NuxtLink :to="'/essay/' + record.id">
                  <h3
                    class="text-lg font-bold dark:text-gray-500 text-blue-300 line-clamp-1"
                  >
                    {{ record.name }}
                  </h3>
                </NuxtLink>
                <samll
                  class="text-sm text-pink-200 dark:text-gray-600 line-clamp-2"
                >
                  {{ record.introduction }}
                </samll>
                <samll class="text-xs text-pink-300 dark:text-gray-600">
                  {{ formateDate(record.createdTime).split(" ")[0] }}
                </samll>
              </div>
            </div>
          </div>
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
        <div class="flex ml-7">
          <el-skeleton-item
            variant="image"
            class="!h-[63px] !w-[112px] md:!h-[90px] md:!w-[160px] !rounded-lg"
          />
          <div class="flex flex-col gap-y-3">
            <el-skeleton-item variant="text" class="!ml-5 !w-[150px]" />
            <el-skeleton-item variant="text" class="!ml-5 !w-[120px]" />
            <el-skeleton-item variant="text" class="!ml-5 !w-[100px]" />
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
import { getEssayTimelines } from "~/api/essay";

const imgPre = useRuntimeConfig().public.imgGalleryBase;

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
