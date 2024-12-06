<template>
  <div class="pt-10 transition-all duration-300 bg-white dark:bg-black">
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

    <div class="flex">
      <main class="flex-1 overflow-x-scroll" @click="mobileAnchorShow = false">
        <MdPreview
          ref="mdRef"
          :previewTheme="data.previewTheme"
          :content="data.content"
        ></MdPreview>
      </main>
      <aside class="md-anchor">
        <div v-if="mdRef">
          <EssayAnchor :anchors="mdRef.anchors"></EssayAnchor>
        </div>
      </aside>
    </div>

    <div class="mobile-anchor" v-if="mdRef">
      <EssayAnchor
        :anchors="mdRef.anchors"
        :class="mobileAnchorShow ? 'block' : 'hidden'"
      ></EssayAnchor>
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

<style scoped>
:deep(.el-card) {
  @apply border-none;
}
.md-anchor {
  @apply sticky overflow-y-scroll overscroll-y-contain max-h-[80vh] top-[70px] right-0 px-3 pb-[150px] hidden flex-col flex-shrink-0 md:flex lg:mx-4 md:w-[240px] lg:w-[280px];
}
.md-anchor::-webkit-scrollbar {
  display: none;
}

.mobile-anchor {
  @apply fixed top-[60px] right-0 max-h-[80vh] overflow-y-scroll overflow-x-hidden lg:hidden;
}

.mobile-anchor::-webkit-scrollbar {
  display: none;
}
</style>

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

const scrollToChatArea = () => {
  const chatArea = document.getElementById("chatArea");
  window.scrollTo({
    top: chatArea.offsetTop,
    behavior: "smooth",
  });
};
</script>
