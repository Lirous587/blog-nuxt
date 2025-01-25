<template>
  <el-select
    v-model="theme"
    placeholder="选择代码主题"
    @change="handelPreviewThemeChange"
  >
    <el-option
      v-for="item in themeOptions"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
const theme = defineModel("theme", {
  type: Array,
  required: true,
});

const themeOptions = [
  { label: "default", value: "default" },
  { label: "github", value: "github" },
  { label: "vuepress", value: "vuepress" },
  { label: "mk-cute", value: "mk-cute" },
  { label: "smart-blue", value: "smart-blue" },

  { label: "cyanosis", value: "cyanosis" },
  { label: "arknights", value: "arknights" },
];
</script>
