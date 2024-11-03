<template>
  <el-container>
    <el-aside width="200px"><GalleryAside></GalleryAside></el-aside>
    <el-container>
      <GallertMain></GallertMain>
    </el-container>
  </el-container>
</template>

<script setup>
import Kind from "./kind.vue";

definePageMeta({
  layout: "admin",
});

const form = reactive({
  Kind: "",
});
</script>

<style></style>
