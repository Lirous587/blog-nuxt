<template>
  <div>
    <small
      @click="getList"
      class="text-xs text-gray-500 hover:cursor-pointer hover:text-blue-300 mt-1"
      v-if="replyCount > 0 && !haveExpand"
    >
      共{{ count }}条评论点击查看
    </small>
    <div v-else v-loading="loading">
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
  </div>
</template>

<script setup>
import { getEssayCommentReplies } from "~/api/comment";

const props = defineProps({
  pid: {
    type: Number,
    required: true,
  },
  replyCount: {
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

const count = ref(props.replyCount);

const pages = computed(() => {
  return parseInt((count.value + query.limit - 1) / query.limit);
});

const haveExpand = ref(false);
const loading = ref(false);

const getList = async () => {
  loading.value = true;
  haveExpand.value = true;
  await getEssayCommentReplies(query)
    .then((res) => {
      const data = res.data;
      list.value = data;
      validateListAndFetchData(list, query, getList);
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePage = async (page) => {
  query.page = page;
  getList();
};

const handleReplyDelete = () => {
  count.value--;
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
  count.value++;
};

onMounted(() => {
  if (props.replyCount > 0) {
    getList();
  }
});

defineExpose({
  clearRepliesChooseStatus,
  unshitOneReply,
});
</script>
