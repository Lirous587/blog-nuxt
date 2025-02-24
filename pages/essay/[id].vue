<template>
  <div class="flex mt-10 mx-3 md:mx-[20px] lg:mx-[90px]">
    <!-- 此处加一个w-0 通知子元素可以在父元素发生溢出 -->
    <main
      class="w-[0] flex-1 rounded-md pt-5 px-2 md:px-4 bg-white dark:bg-black"
    >
      <TypeWriter
        class="select-none text-blue-300 text-3xl font-bold dark:text-gray-500 my-1"
        :sentenceList="sentenceList"
        :addSpeed="150"
        :deleteSpeed="50"
      />

      <div class="text-xs text-gray-400 dark:text-gray-500 mx-2">
        {{ data.introduction }}
      </div>

      <div class="flex items-center text-gray-400 dark:text-pink-800 p-2">
        <NuxtLink
          class="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800"
          :to="'/label/' + label.id + '/1'"
          v-for="label in data.labelList"
        >
          {{ label.name }}
        </NuxtLink>
      </div>

      <MdPreview
        ref="mdRef"
        :previewTheme="data.theme"
        :content="data.content"
        @click="mobileAnchorShow = false"
      ></MdPreview>

      <small class="text-right block font-bold text-blue-600 dark:text-yellow-300 mr-5">
        于{{ formateDate(data.updatedTime) }}更新
      </small>

      <div id="chatArea" class="dark:bg-black dark:text-neutral-300 p-3">
        <EssayComment :eid="id"></EssayComment>
      </div>
      <EssayNearList :list="data.nearEssayList"></EssayNearList>
    </main>

    <aside
      v-if="mdRef && Array.isArray(mdRef.anchors) && mdRef.anchors.length > 0"
      class="sticky hidden h-fit top-0 right-[5px] transition-all duration-500 md:block"
      :class="headerStore.ifFold ? 'top-[20px]' : 'top-[70px]'"
    >
      <MyCard class="ml-5">
        <EssayAnchor :anchors="mdRef.anchors"></EssayAnchor>
      </MyCard>
    </aside>

    <div
      class="anchor fixed right-[5px] md:hidden transition-[top] duration-500"
      v-if="mdRef && Array.isArray(mdRef.anchors) && mdRef.anchors.length > 0"
      :class="[
        mobileAnchorShow ? 'fixed' : 'hidden',
        headerStore.ifFold ? 'top-[20px]' : 'top-[70px]',
      ]"
    >
      <MyCard class="ml-5 shadow-2xl">
        <EssayAnchor :anchors="mdRef.anchors"></EssayAnchor>
      </MyCard>
    </div>

    <FixedTool>
      <div
        class="flex items-center justify-center p-1 rounded-lg bg-[rgb(53,212,244)] dark:bg-[rgb(129,199,213)]"
        @click="mobileAnchorShow = !mobileAnchorShow"
      >
        <MyIconBook class="scale-90 dark:text-green-200"></MyIconBook>
      </div>
      <div
        class="flex items-center justify-center p-1 py-2 rounded-lg text-blue-400 dark:text-gray-200 bg-yellow-100 dark:bg-pink-300"
        @click="scrollToChatArea()"
      >
        <MyIconComment class="scale-110"> </MyIconComment>
      </div>
    </FixedTool>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";
import { useMyDefaultHeaderStore } from "~/store/defaultHeader";
definePageMeta({
  scrollToTop: true,
  layout: "essay",
});
const mdRef = ref(null);
const mobileAnchorShow = ref(false);
const sentenceList = ref([]);
const data = ref(null);

const route = useRoute();
const id = parseInt(route.params.id);

const getData = async () => {
  await getEssay(id).then((res) => {
    data.value = res.data;
    sentenceList.value = [data.value.name, formateDate(data.value.createdTime)];
  });
};

await getData();

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;
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

const headerStore = useMyDefaultHeaderStore();
</script>
