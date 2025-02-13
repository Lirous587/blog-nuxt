<template>
  <div class="mx-auto flex flex-col gap-4 mt-5 select-none">
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
              class="min-w-[300px] overflow-hidden pb-5 relative hover:!shadow-lg transition-all duration-300 transform mb-4"
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
                  class="float-left w-[120px] sm:w-[140px] md:w-[150px] h-full p-3 rounded-xs shadow-2xs border border-pink-400 ease-in-out dark:opacity-60 transition-all duration-500 mr-2"
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
    <Paging :pages="pages" preHref="/timeEvent"></Paging>
  </div>
</template>

<script setup>
import { getTimeEventList } from "~/api/timeEvent";

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;

definePageMeta({
  scrollToTop: true,
});

const route = useRoute();

const queryForm = reactive({
  page: route.params.page || 1,
  limit: 10,
});

const list = ref([]);
const pages = ref(1);

await getTimeEventList(queryForm).then((res) => {
  const data = res.data;
  // if (Array.isArray(list)) {
  //   list.forEach()
  // }
  list.value = data.list;
  pages.value = data.pages;
});
</script>
