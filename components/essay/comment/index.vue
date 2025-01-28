<template>
  <EssayCommentHeader @comment="handleComment" :eid="eid"></EssayCommentHeader>
  
  <EssayCommentBody :eid="eid" ref="bodyRef"></EssayCommentBody>
</template>

<script setup>
const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const userInfo = getUserInfoFromCookie();

const tempList = ref([]);

const handleComment = (content) => {
  let row = {
    avatar: userInfo.avatar,
    name: userInfo.name,
    content: content,
  };
  tempList.value.unshift(row);
};
</script>
