<template>
  <div class="mt-5" v-if="loading">
    <div class="ml-5 mr-5">
      <div class="flex justify-between items-center">
        <TypeWriter
          class="text-lg font-bold"
          :first-word="data.name"
          :last-word="formateDate(data.createdTime)"
          :typingSpeed="100"
        ></TypeWriter>

        <div class="flex items-center gap-x-1 text-gray-500">
          <el-icon size="14"><View /></el-icon>
          {{ data.visitedTimes }}
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
      <Md v-model:content="data.content"></Md>

      <el-collapse
        class="px-3"
        :accordion="true"
        v-if="
          Array.isArray(data.nearEssayList) && data.nearEssayList.length > 0
        "
        v-model="activeNames"
      >
        <el-collapse-item name="1" title="近期同分类文章">
          <UserEssayList :list="data.nearEssayList"></UserEssayList>
        </el-collapse-item>
      </el-collapse>
    </ClientOnly>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";

const route = useRoute();
const id = route.params.id;

const data = ref({});

const loading = ref(false);

const activeNames = ref(["1"]);

await getEssay(id)
  .then((res) => {
    data.value = res.data;
    loading.value = true;
  })
  .catch((err) => {
    if (err.code === 1005) navigateTo("/");
  });
</script>
