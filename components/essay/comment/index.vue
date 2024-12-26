<template>
  <el-card shadow="hover" v-for="item in list" class="my-4 hover:animate-pulse">
    <EssayCommentParent :data="item"> </EssayCommentParent>
    <div v-for="son in item.sons" class="ml-5">
      <EssayCommentSon :data="son"></EssayCommentSon>
      <div v-for="reply in son.replies">
        <EssayCommentReply :data="reply"></EssayCommentReply>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getEssayCommentList } from "~/api/comment";
const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});
const list = ref([]);

const getList = () => {
  getEssayCommentList(props.eid).then((res) => {
    const data = res.data;
    list.value = data;
  });
};
onMounted(() => {
  getList();
});
</script>
