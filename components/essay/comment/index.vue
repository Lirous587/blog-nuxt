<template>
  <EssayCommentHeader @comment="handelComment" :eid="eid"></EssayCommentHeader>
  <EssayCommentBody :eid="eid" ref="bodyRef"></EssayCommentBody>
</template>

<script setup>
const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const bodyRef = ref(null);

const userInfo = getUserInfoFromCookie();

const handelComment = (content) => {
  let row = {
    avatar: userInfo.avatar,
    name: userInfo.name,
    content: content,
  };
  bodyRef.value.list.unshift(row);
};
</script>
