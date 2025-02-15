<template>
  <div class="pt-5 px-2 md:px-4 bg-white dark:bg-black">
    <div>
      <div class="flex justify-between items-center mb-2">
        <TypeWriter
          class="select-none rounded-xl text-blue-600 text-lg font-bold dark:text-gray-500"
          :sentenceList="sentenceList"
          :addSpeed="150"
          :deleteSpeed="50"
        />
      </div>

      <div class="text-sm text-green-600 dark:text-gray-500 ml-2">
        {{ data.introduction }}
      </div>

      <div class="select-none flex mt-2 flex-wrap items-center ml-2">
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
      <main
        class="flex-1 overflow-x-auto min-w-[300px]"
        @click="mobileAnchorShow = false"
      >
        <MdPreview
          ref="mdRef"
          :previewTheme="data.theme"
          :content="data.content"
        ></MdPreview>
        <div id="chatArea" class="dark:bg-black dark:text-neutral-300 p-3">
          <EssayComment :eid="id"></EssayComment>
        </div>
        <EssayNearList :list="data.nearEssayList"></EssayNearList>
      </main>
      <aside
        v-if="mdRef && Array.isArray(mdRef.anchors) && mdRef.anchors.length > 0"
        class="anchor sticky top-[70px] right-[5px] hidden lg:block"
      >
        <EssayAnchor :anchors="mdRef.anchors"></EssayAnchor>
      </aside>
    </div>

    <div
      class="anchor fixed top-[70px] right-[5px] lg:hidden"
      v-if="mdRef && Array.isArray(mdRef.anchors) && mdRef.anchors.length > 0"
    >
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

<script setup>
import { getEssay } from "~/api/essay";
definePageMeta({
  scrollToTop: true,
});
const mdRef = ref(null);
const mobileAnchorShow = ref(false);
const sentenceList = ref([]);
const loading = ref(false);
const data = ref(null);

const route = useRoute();
const id = parseInt(route.params.id);

const getData = async () => {
  loading.value = true;

  await getEssay(id)
    .then((res) => {
      data.value = res.data;
      sentenceList.value = [
        data.value.name,
        formateDate(data.value.createdTime),
      ];
    })
    .catch(() => {
      navigateTo("/");
    })
    .finally(() => {
      loading.value = true;
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
</script>

<style scoped>
.anchor {
  height: fit-content;
  max-height: 500px;
  min-width: 160px;
  overflow: auto;
  border-radius: 8px;
  border: 1px solid pink;
}
.dark .anchor {
  border: 1px solid rgb(14, 21, 52);
}
.anchor::-webkit-scrollbar {
  display: none;
}
</style>
