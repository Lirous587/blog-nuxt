<template>
  <div v-loading="loading">
    <div v-for="item in list" :key="item.id">
      <EssayCommentReply
        :data="item"
        @choose="handleReplyChoose"
        @delete="handleReplyDelete"
      >
      </EssayCommentReply>
    </div>

    <el-pagination
      layout="prev, pager, next"
      :page-count="pages"
      :hide-on-single-page="true"
      @change="changePage"
    />
  </div>
</template>

<script setup>
import { getEssayCommentReplies } from "~/api/essay_comment";

const props = defineProps({
  pid: {
    type: Number,
    required: true,
  },
});

const query = reactive({
  pid: props.pid,
  page: 1,
  limit: 5,
});
const list = ref([]);
const pages = ref(0);
const loading = ref(false);

const getList = async () => {
  loading.value = true;
  await getEssayCommentReplies(query)
    .then((res) => {
      const data = res.data;
      list.value = data.list;
      pages.value = data.pages;
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePage = (page) => {
  query.page = page;
  getList();
};

const handleReplyDelete = () => {
  getList();
};

const emits = defineEmits(["choose"]);

const handleReplyChoose = (emitData) => {
  emits("choose", emitData);
};

const clearRepliesChooseStatus = () => {
  list.value.forEach((item) => {
    item.replayStatus = false;
  });
};

const unshitOneReply = (row) => {
  list.value.unshift(row);
};

onMounted(() => {
  getList();
});

defineExpose({
  clearRepliesChooseStatus,
  unshitOneReply,
});
</script>
