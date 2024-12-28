<template>
  <div class="pt-10 transition-all duration-300 bg-white dark:bg-black">
    <div>
      <div class="flex justify-between items-center mb-2">
        <TypeWriter
          class="rounded-xl text-opacity-60 dark:text-gray-500"
          :sentenceList="sentenceList"
          :addSpeed="150"
          :deleteSpeed="50"
        />
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
        <div id="chatArea" class="dark:bg-black dark:text-neutral-300 p-3">
          <EssayComment></EssayComment>
        </div>
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
  </div>
</template>

<style scoped>
.md-anchor {
  @apply sticky top-[70px] right-0 mx-3 max-h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden rounded-xl  hidden md:block md:min-w-[240px] lg:min-w-[280px] lg:mx-4;
}
.md-anchor::-webkit-scrollbar {
  display: none;
}

.mobile-anchor {
  @apply fixed top-[65px] right-0  max-h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden rounded-xl lg:hidden;
}

.mobile-anchor::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import { getEssay } from "~/api/essay";

definePageMeta({
  scrollToTop: true,
});

const mdRef = ref(null);

const mobileAnchorShow = ref(false);

const sentenceList = ref([]);
const route = useRoute();
const id = route.params.id;
const data = ref({});

provide("eid", id);

await getEssay(id)
  .then((res) => {
    data.value = res.data;
    sentenceList.value = [data.value.name, formateDate(data.value.createdTime)];
  })
  .catch((err) => {
    if (err.code === 1005) navigateTo("/");
  });

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase + "/";
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
