<template>
  <div>
    {{ list }}
  </div>
</template>

<script setup>
import { getFriendLinkRandom20 } from "~/api/friendLink";

const list = ref([]);
const getList = () => {
  getFriendLinkRandom20().then((res) => {
    const data = res.data;
    list.value = data;
  });
};
getList();
</script>

<style></style>
