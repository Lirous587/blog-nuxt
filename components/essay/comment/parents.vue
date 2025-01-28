<template>
  <div v-loading="loading">
    <el-card
      shadow="hover"
      v-for="(item, index) in list"
      :key="item.id"
      class="my-4"
    >
      <EssayCommentParent
        @Choose="handleChoose"
        @Delete="handleDelete"
        :data="item"
        :ref="(el) => setListRef(el, index)"
      >
      </EssayCommentParent>
    </el-card>

    <el-divider
      v-loading="bottomLoading"
      content-position="center"
      border-style="dashed"
    >
      <el-button v-if="haveMore" text type="primary" @click="getMore">
        <small class="dark:text-gray-400">更多评论</small>
      </el-button>
      <small v-else class="dark:text-gray-400">暂无更多评论</small>
    </el-divider>
  </div>
</template>

<script setup>
import { getEssayCommentParents } from "~/api/comment";

const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const list = ref([]);
const listRef = ref([]);
const setListRef = (el, index) => {
  listRef.value[index] = el;
};
const query = reactive({
  eid: props.eid,
  page: 1,
  limit: 5,
});

const haveMore = ref(true);

const bottomLoading = ref(false);

const loading = ref(false);

const getMore = async () => {
  bottomLoading.value = true;
  await getEssayCommentParents(query)
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        list.value.push(...data);
        if (data.length < query.limit) haveMore.value = false;
      } else {
        haveMore.value = false;
      }
      query.page += 1;
    })
    .finally(() => {
      bottomLoading.value = false;
    });
};

onMounted(async () => {
  await getMore(query);
});

const handleChoose = () => {
  list.value.forEach((parent) => {
    parent.replayStatus = false;
  });
  listRef.value.forEach((parent) => {
    // parent.clearReplyCommentStatus();
  });
};

const handleDelete = (id) => {
  loading.value = true;
  setTimeout(() => {
    list.value = list.value.filter((item) => item.id !== id);
    loading.value = false;
  }, 300);
};

defineExpose({
  list,
});
</script>
