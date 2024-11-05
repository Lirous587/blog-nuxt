<template>
  <div>
    <div class="mt-5" v-if="!loading">
      <div class="ml-5 mr-5">
        <div class="flex justify-between items-center">
          <TypeWriter
            class="p-3 rounded-xl text-xl text-opacity-60 mb-5"
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

      <el-card>
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
            class="relative"
          >
            <NuxtLink :to="'/essay/' + item.id">
              <el-image
                :src="imgPre + item.imgUrl"
                lazy
                fit="cover"
                class="w-full h-[72px] lg:h-[90px] xl:h-[108px]"
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
});

const sentenceList = ref([]);
const route = useRoute();
const id = route.params.id;
const activeNames = ref(["1"]);
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
