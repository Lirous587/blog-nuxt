<template>
  <div>
    <EssayCommentHeader
      @comment="handleComment"
      :eid="eid"
    ></EssayCommentHeader>
    <EssayCommentBody :eid="eid" ref="bodyRef"></EssayCommentBody>
  </div>
</template>

<script setup>
const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const bodyRef = ref(null);

const handleComment = (row) => {
  bodyRef.value.parents.unshift(row);
};
</script>
