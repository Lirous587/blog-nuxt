<template>
  <div class="mx-auto flex flex-col gap-4 mt-5">
    <el-timeline>
      <el-timeline-item
        v-for="item in list"
        :timestamp="item.date"
        placement="top"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mr-2">
          <div v-for="event in item.events">
            <el-card
              shadow="always"
              class="min-w-[300px] overflow-hidden relative hover:!shadow-lg transition-all duration-300 transform mb-4"
            >
              <div class="flex justify-between">
                <div class="font-bold text-pink-400 dark:text-yellow-600">
                  {{ event.topic }}
                </div>

                <el-link
                  :href="event.relatedLink"
                  target="_blank"
                  :underline="true"
                >
                  <span class="font-bold text-pink-400 dark:text-blue-600">
                    {{ event.relatedLink ? "相关链接" : "" }}
                  </span>
                </el-link>
              </div>

              <div
                class="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] overflow-auto"
              >
                <el-image
                  class="float-left select-none w-[120px] sm:w-[140px] md:w-[150px] h-full p-3 rounded-xs shadow-2xs border border-pink-400 ease-in-out dark:opacity-60 transition-all duration-500 mr-2"
                  :src="imgPre + event.img.url"
                  lazy
                  fit="cover"
                />
                <small class="block mt-2 text-pink-400">
                  {{ event.introduction }}
                </small>
              </div>
            </el-card>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
    <div ref="loadMoreTrigger" class="w-full flex items-center justify-center">
      <el-skeleton
        class="pl-10 !grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mr-2"
        :loading="ifHaveMore"
        animated
        :throttle="500"
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
                <el-skeleton-item
                  variant="text"
                  class="!ml-[20px] !w-[100px]"
                />
                <br />
                <el-skeleton-item
                  variant="text"
                  class="!ml-[20px] !w-[100px]"
                />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup>
import { getTimeEventList } from "~/api/timeEvent";

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;

definePageMeta({
  scrollToTop: true,
});

const queryForm = reactive({
  page: 1,
  limit: 10,
});

const list = ref([]);
const pages = ref(1);

await getTimeEventList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  pages.value = data.pages;
});

const isLoadingMore = ref(false);
const ifHaveMore = ref(true);
const loadMoreTrigger = ref(null);

const loadMore = () => {
  //  1.正在加载的时候不去处理
  if (isLoadingMore.value) {
    ifHaveMore.value = false;
    return;
  }
  // 2.queryForm.page >= pages.value时加载完成
  // 判断是否还有下一页且当前不在加载中
  if (queryForm.page >= pages.value) {
    ifHaveMore.value = false;
    return;
  }

  isLoadingMore.value = true;
  queryForm.page += 1;
  getTimeEventList(queryForm)
    .then((res) => {
      // 合并新数据到原列表
      list.value.push(...res.data.list);
    })
    .finally(() => {
      isLoadingMore.value = false;
    });
};

ScrollLoading(loadMoreTrigger, loadMore);
</script>
