<template>
  <div v-if="loading" class="flex flex-col gap-y-5 lg:gap-y-10 flex-shrink-0">
    <UserAuthorCard
      class="bg-gradient-to-br from-green-200 to-blue-100"
      :authorData
    ></UserAuthorCard>

    <UserIndexRecommendEssay
      class="bg-gradient-to-br from-pink-50 to-green-50"
      :list="recommentEssayList"
    ></UserIndexRecommendEssay>
    <UserIndexLabel
      class="bg-gradient-to-br from-blue-50 to-cyan-100"
      :list="labelList"
    ></UserIndexLabel>
    <UserIndexKind
      class="bg-gradient-to-br from-cyan-100 to-green-50"
      :list="kindList"
    ></UserIndexKind>
  </div>
</template>

<script setup>
import { getIndexInfo } from "~/api/user";
const labelList = ref([]);
const kindList = ref([]);
const loading = ref(false);
const recommentEssayList = ref([]);

const authorData = reactive({
  essay: {
    name: "文章",
    count: 0,
  },
  label: {
    name: "标签",
    count: 0,
  },
  kind: {
    name: "分类",
    count: 0,
  },
});

const getIndexData = async () => {
  getIndexInfo().then((res) => {
    const data = res.data;
    recommentEssayList.value = data.essayList;
    labelList.value = data.labelList;
    kindList.value = data.kindList;

    authorData.label.count = labelList.value.length;
    authorData.kind.count = kindList.value.length;
    authorData.essay.count = kindList.value.reduce(
      (accumulator, kind) => accumulator + kind.essayCount,
      0
    );
    loading.value = true;
  });
};

await getIndexData();
</script>
