<template>
  <el-card shadow="hover" v-for="item in list" class="my-4">
    <EssayCommentParent @Choose="handelCloseAllComment" :data="item">
    </EssayCommentParent>
    <div v-for="son in item.sons" class="ml-5">
      <EssayCommentSon
        @Choose="handelCloseAllComment"
        :data="son"
      ></EssayCommentSon>
      <div v-for="reply in son.replies">
        <EssayCommentReply
          @Choose="handelCloseAllComment"
          :data="reply"
        ></EssayCommentReply>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getEssayCommentList } from "~/api/comment";
const list = ref([]);
const eid = inject("eid");

const getList = () => {
  getEssayCommentList(eid).then((res) => {
    const data = res.data;
    list.value = data;
  });
};

const handelCloseAllComment = () => {
  list.value.forEach((parent) => {
    parent.ifComment = false;
    console.log(parent);
    let sons = parent.sons ? parent.sons : [];
    sons.forEach((son) => {
      son.ifComment = false;
      let replies = son.replies ? son.replies : [];
      replies.forEach((reply) => {
        reply.ifComment = false;
      });
    });
  });
};

onMounted(() => {
  getList();
});
</script>
