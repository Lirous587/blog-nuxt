<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="38" :src="avatarPre + data.avatar"></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 p-1 gap-y-1">
      <span class="font-bold font-sans">
        {{ data.name }}
      </span>
      <span>
        {{ data.content }}
      </span>
      <div class="flex items-center gap-x-2 text-sm">
        <small class="text-gray-500">
          {{ formateDate(data.createTime) }}
        </small>
        <small
          class="text-pink-500 hover:cursor-pointer hover:text-blue-300"
          @click="handelCommentPre(data)"
        >
          {{ data.ifComment ? "回复中" : "回复" }}
        </small>
      </div>

      <small
        @click="getMoreComment"
        class="text-xs text-gray-500 hover:cursor-pointer hover:text-blue-300 mt-1"
        v-if="data.replyCount > 0 && !havaExpand"
      >
        共{{ data.replyCount }}条评论点击查看
      </small>

      <EssayCommentReply :list="list"></EssayCommentReply>

      <el-pagination
        v-if="havaExpand"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :page-count="pageCount"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { createEssayCommentReply, getEssayCommentReplies } from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

// 回复
const eid = parseInt(inject("eid"));

const emits = defineEmits("Choose");

const form = reactive({
  parentID: 0,
  essayID: eid,
  content: "",
});

const handelCommentPre = (item) => {
  form.parentID = item.id;
  emits("Choose");
  item.ifComment = true;
};

const handelCreate = () => {
  createEssayCommentReply(form).then((res) => {
    ElMessage.success("评论成功");
  });
};

// replies
const query = reactive({
  pid: props.data.id,
  page: 1,
  pageSize: 5,
});
const list = ref([]);
const pageCount = parseInt(
  (props.data.replyCount + query.pageSize) / query.pageSize
);
const havaExpand = ref(false);
const loading = ref(false);

const getList = async () => {
  loading.value = true;
  await getEssayCommentReplies(query)
    .then((res) => {
      const data = res.data;
      havaExpand.value = true;
      list.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const getMoreComment = () => {
  getList();
};

const changePage = async (page) => {
  query.page = page;
  getList();
};
</script>
