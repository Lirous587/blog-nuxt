<template>
  <EssayCommentCreateParent @comment="handelComment"></EssayCommentCreateParent>
  <div v-loading="listLoading">
    <el-card shadow="hover" v-for="item in list" class="my-4">
      <EssayCommentParent
        @Choose="handelParentChoose"
        @Delete="handelParentDelete"
        :data="item"
        :key="item.id"
      >
      </EssayCommentParent>
    </el-card>

    <el-divider
      v-loading="bottomLoading"
      content-position="center"
      border-style="dashed"
    >
      <el-button v-if="havaMore" text type="primary" @click="getMoreComment">
        <small class="dark:text-gray-400">更多评论</small>
      </el-button>
      <small v-else class="dark:text-gray-400">暂无更多评论</small>
    </el-divider>
  </div>
</template>

<script setup>
import { getEssayCommentParents } from "~/api/comment";
const list = ref([]);
const eid = inject("eid");

const query = reactive({
  eid: eid,
  page: 1,
  pageSize: 5,
});

const userInfo = getUserInfoFromCookie();

const havaMore = ref(true);

const bottomLoading = ref(false);

const listLoading = ref(false);

const getList = async (q) => {
  bottomLoading.value = true;
  await getEssayCommentParents(q)
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        list.value.push(...data);
        if (data.length < query.pageSize) havaMore.value = false;
      } else {
        havaMore.value = false;
      }
    })
    .finally(() => {
      bottomLoading.value = false;
    });
};

const getMoreComment = () => {
  query.page += 1;
  getList(query);
};

const handelParentChoose = () => {
  list.value.forEach((parent) => {
    parent.ifComment = false;
  });
};

const handelComment = (content) => {
  let row = {
    avatar: userInfo.avatar,
    name: userInfo.name,
    createTime: "刚刚",
    content: content,
  };
  list.value.unshift(row);
};

const handelParentDelete = (id) => {
  listLoading.value = true;
  setTimeout(() => {
    list.value = list.value.filter((item) => item.id !== id);
    listLoading.value = false;
  }, 300);
};

onMounted(async () => {
  await getList(query);
});
</script>
