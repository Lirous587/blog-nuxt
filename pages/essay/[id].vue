<template>
  <TopLoading></TopLoading>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
    <main class="flex-1 mx-3 lg:ml-20">
      <div>
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
              <Md ref="mdRef" v-model:content="data.content"></Md>
            </div>
          </ClientOnly>

          <el-card
            class="dark:!bg-black mt-5"
            v-if="
              Array.isArray(data.nearEssayList) && data.nearEssayList.length
            "
          >
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
      <RecordBottom></RecordBottom>
    </main>

    <aside class="sticky-aside">
      <div
        v-if="mdRef"
        class="anchor-outer flex flex-col transition-all duration-300 gap-y-1 border dark:border-none rounded-md mb-4 dark:text-white pl-10 py-3 bg-gradient-to-br from-neutral-50 to-zinc-100 dark:from-pink-900 dark:to-slate-900"
      >
        <div class="h-[1em] leading-[1em] font-bold relative pl-1 mb-2">
          文章目录
          <div
            class="absolute flex flex-col top-0 h-[1em] justify-around translate-x-[-120%]"
          >
            <span
              class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-100"
            >
            </span>
            <span
              class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-100"
            >
            </span>
            <span
              class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-100"
            >
            </span>
          </div>
        </div>
        <a
          v-for="(item, index) in mdRef.anchors"
          :key="index"
          class="anchor"
          :class="item.active ? 'active' : ''"
          :href="'#' + item.id"
        >
          {{ item.title }}
        </a>
      </div>

      <UserNavAside
        :showList="['recommentEssay', 'label', 'kind']"
      ></UserNavAside>
    </aside>
  </div>

  <UserNavBottom></UserNavBottom>
  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";

definePageMeta({
  middleware: ["index-data"],
  layout: "",
});

const mdRef = ref(null);

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
:deep(.el-card) {
  @apply border-none;
}
.sticky-aside {
  @apply sticky overscroll-y-contain top-[70px] max-h-[100vh] pb-[150px] overflow-y-scroll hidden ml-5 flex-col lg:mr-20 lg:flex lg:w-[350px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}

.anchor {
  @apply relative hover:cursor-pointer transition-all duration-300 blur-[1px] text-lg font-mono;
}

.anchor:hover {
  @apply text-pink-300 scale-110;
}

.active {
  @apply text-yellow-300 blur-0 scale-110;
}
.anchor-outer:hover a {
  @apply blur-0;
}
</style>
