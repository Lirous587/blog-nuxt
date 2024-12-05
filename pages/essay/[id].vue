<template>
  <div v-loading="loadding">
    <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
      <main class="flex-1" @click="mobileAnchorShow = false">
        <div class="mt-5">
          <div class="mb-5">
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
              <el-tag
                type="primary"
                size="small"
                class="dark:!bg-black dark:text-gray-500 dark:border-gray-700"
              >
                <NuxtLink :to="'/kind/' + data.kindID + '/1'">
                  {{ data.kindName }}
                </NuxtLink>
              </el-tag>
              <el-tag
                type="info"
                size="small"
                class="mx-1 dark:!bg-black dark:text-gray-500 dark:border-gray-700"
                v-for="label in data.labelList"
              >
                <NuxtLink :to="'/label/' + label.id + '/1'">
                  {{ label.name }}
                </NuxtLink>
              </el-tag>
            </div>
          </div>

          <div class="w-[calc(100vw-10px)] md:w-auto">
            <MdPreview ref="mdRef" :content="data.content"></MdPreview>
          </div>

          <!-- <el-card
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
          </el-card> -->
        </div>
      </main>

      <div class="fixed top-[60px] right-0 lg:hidden" v-if="mdRef">
        <EssayAnchor
          :anchors="mdRef.anchors"
          :class="mobileAnchorShow ? 'block' : 'hidden'"
        ></EssayAnchor>
      </div>

      <aside class="sticky-aside">
        <div v-if="mdRef">
          <EssayAnchor :anchors="mdRef.anchors"></EssayAnchor>
        </div>
      </aside>
    </div>

    <FixedTool
      :tool-list="['top', 'chat', 'menu']"
      :menu-func="
        () => {
          mobileAnchorShow = !mobileAnchorShow;
        }
      "
      :chat-func="() => scrollToChatArea()"
    ></FixedTool>

    <div id="chatArea" class="dark:bg-black dark:text-neutral-300">
      这里是未来的聊天区
    </div>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";

definePageMeta({
  middleware: ["index-data"],
  scrollToTop: true,
});

const mdRef = ref(null);

const mobileAnchorShow = ref(false);

const sentenceList = ref([]);
const route = useRoute();
const id = route.params.id;
const data = ref({});

const loadding = ref(true);

await getEssay(id)
  .then((res) => {
    data.value = res.data;
    sentenceList.value = [data.value.name, formateDate(data.value.createdTime)];
  })
  .catch((err) => {
    if (err.code === 1005) navigateTo("/");
  })
  .finally(() => {
    loadding.value = false;
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

const scrollToChatArea = () => {
  const chatArea = document.getElementById("chatArea");
  window.scrollTo({
    top: chatArea.offsetTop,
    behavior: "smooth",
  });
};
</script>

<style scoped>
:deep(.el-card) {
  @apply border-none;
}
.sticky-aside {
  @apply sticky overflow-y-scroll overscroll-y-contain max-h-[calc(100vh-60px)] top-[70px] px-3 pb-[150px] hidden ml-5 flex-col md:mx-3 md:flex md:w-[240px] lg:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
