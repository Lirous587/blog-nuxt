<template>
  <div>
    <div
      class="fixed z-50 top-0 left-0 h-[5px] bg-pink-300 rounded-md progress"
    ></div>
    <div class="mt-5" v-if="!loading">
      <div class="mx-5 mb-5">
        <div class="flex justify-between items-center mb-2">
          <TypeWriter
            class="rounded-xl text-opacity-60 dark:text-gray-500"
            :sentenceList="sentenceList"
            :addSpeed="150"
            :deleteSpeed="50"
          />

          <div class="flex items-center gap-x-1 text-gray-500">
            <el-icon size="14"><View /></el-icon>
            {{ data.visitedTimes + 1 }}
          </div>
        </div>

        <div class="text-sm text-gray-500 ml-2">
          {{ data.introduction }}
        </div>
        <div class="flex mt-2 flex-wrap items-center ml-2">
          <el-tag type="primary" size="small">
            <NuxtLink :to="'/kind/' + data.kindID + '/1'">
              {{ data.kindName }}
            </NuxtLink>
          </el-tag>
          <el-tag
            type="info"
            size="small"
            class="mx-1"
            v-for="label in data.labelList"
          >
            <NuxtLink :to="'/label/' + label.id + '/1'">
              {{ label.name }}
            </NuxtLink>
          </el-tag>
        </div>
      </div>

      <ClientOnly>
        <div>
          <Md v-model:content="data.content"></Md>
        </div>
      </ClientOnly>

      <el-card class="dark:!bg-black mt-5">
        <template #header>
          <div class="relative leading-[1em]">
            <span
              class="h-[1em] w-[5px] absolute left-0 top-0 bg-blue-400"
            ></span>
            <span class="ml-4 font-serif font-bold">相关文章</span>
          </div>
        </template>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <el-card
            v-for="item in data.nearEssayList"
            :key="item.id"
            class="relative dark:!bg-black"
          >
            <NuxtLink :to="'/essay/' + item.id">
              <el-image
                :src="imgPre + item.img.url"
                fit="cover"
                class="w-full h-[135px]"
              ></el-image>
              <div
                class="absolute bottom-0 w-full h-[1.5em] right-0 bg-gray-600 bg-opacity-50 text-white p-2"
              >
                <span
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 line-clamp-1 text-xs"
                >
                  {{ item.name }}</span
                >
              </div>
            </NuxtLink>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";

definePageMeta({
  middleware: ["index-data"],
  layout: "essay",
});

const sentenceList = ref([]);
const route = useRoute();
const id = route.params.id;
const data = ref({});

const nuxtApp = useNuxtApp();

// 是否首次加载
const loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

await getEssay(id)
  .then((res) => {
    data.value = res.data;
    sentenceList.value = [data.value.name, formateDate(data.value.createdTime)];
  })
  .catch((err) => {
    if (err.code === 1005) navigateTo("/");
  });

const config = useRuntimeConfig();
const imgPre = config.public.imgBase + "/";
useSeoMeta({
  title: data.value.name,
  ogTitle: data.value.name,
  description: data.value.introduction,
  ogDescription: data.value.introduction,
  ogImage: imgPre + data.value.imgUrl,
  twitterCard: imgPre + data.value.imgUrl,
});
</script>

<style scoped>
@keyframes grow-progress {
  from {
    width: 0;
  }
  to {
    width: 100vw;
  }
}

.progress {
  animation: grow-progress 3s linear;
  animation-timeline: scroll(root);
}
:deep(.el-card) {
  @apply border-none;
}
</style>
