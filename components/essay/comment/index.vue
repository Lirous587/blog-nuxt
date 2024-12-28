<template>
  <EssayCommentCreateParent @comment="handelComment"></EssayCommentCreateParent>
  <el-card shadow="hover" v-for="item in list" class="my-4">
    <EssayCommentParent
      @Choose="handelParentChoose"
      :data="item"
      :key="item.id"
    >
    </EssayCommentParent>
  </el-card>

  <el-divider
    v-loading="loading"
    content-position="center"
    border-style="dashed"
  >
    <el-button v-if="havaMore" text type="primary" @click="getMoreComment">
      <small>更多评论</small>
    </el-button>
    <small v-else>暂无更多评论</small>
  </el-divider>
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

const havaMore = ref(true);

const loading = ref(false);

const getList = async (q) => {
  loading.value = true;
  await getEssayCommentParents(q)
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        list.value.push(...data);
      } else {
        havaMore.value = false;
      }
    })
    .finally(() => {
      loading.value = false;
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
  const userInfo = getUserInfoFromCookie();
  let row = {
    avatar: userInfo.avatar,
    name: userInfo.name,
    createTime: "刚刚",
    content: content,
  };
  list.value.unshift(row);
};

onMounted(async () => {
  await getList(query);
});
</script>
