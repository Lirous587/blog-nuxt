<template>
  <div v-loading="loadding">
    <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
      <main class="" @click="mobileAnchorShow = false">
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

          <div class="w-[calc(100vw-30px)] md:w-auto">
            <MdPreview
              ref="mdRef"
              :previewTheme="data.previewTheme"
              :content="data.content"
            ></MdPreview>
          </div>
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
  @apply sticky overflow-y-scroll overscroll-y-contain max-h-[calc(100vh-60px)] top-[70px] right-0 px-3 pb-[150px] hidden  flex-col flex-shrink-0 md:flex lg:mx-4  md:w-[240px] lg:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
