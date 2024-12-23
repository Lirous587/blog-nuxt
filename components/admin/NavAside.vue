<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="defaultActive"
    :unique-opened="true"
  >
    <NuxtLink to="/admin">
      <el-menu-item index="/admin">
        <el-icon><PieChart /></el-icon>
        <template #title>
          <span>面板</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Notebook /></el-icon>
        <span>文章</span>
      </template>
      <NuxtLink to="/admin/essay/create">
        <el-menu-item index="/admin/essay/create"> 创建文章 </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/essay/manage">
        <el-menu-item index="/admin/essay/manage"> 管理文章 </el-menu-item>
      </NuxtLink>
    </el-sub-menu>

    <!-- 分类 -->
    <NuxtLink to="/admin/kind">
      <el-menu-item index="/admin/kind">
        <el-icon><Files /></el-icon>
        <template #title>
          <span>分类</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <NuxtLink to="/admin/kind">
      <el-menu-item index="/admin/label">
        <el-icon><Folder /></el-icon>
        <template #title>
          <span>分类</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 心语 -->
    <NuxtLink to="/admin/heartWords">
      <el-menu-item index="/admin/heartWords">
        <el-icon><IceTea /></el-icon>
        <template #title>
          <span>心语</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 友链 -->
    <NuxtLink to="/admin/">
      <el-menu-item index="/admin/friendLink">
        <el-icon><ToiletPaper /></el-icon>
        <template #title>
          <span>友链</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 图库 -->
    <NuxtLink to="/admin/gallery">
      <el-menu-item index="/admin/gallery">
        <el-icon><DocumentCopy /></el-icon>
        <template #title>
          <span>图库</span>
        </template>
      </el-menu-item>
    </NuxtLink>
  </el-menu>
</template>

<script setup>
const route = useRoute();

const isCollapse = ref(false);

const defaultActive = ref("/admin");

const expand = () => {
  isCollapse.value = false;
};
const collapse = () => {
  isCollapse.value = true;
};

watch(
  () => route.path,
  () => {
    defaultActive.value = route.path;
  },
  {
    immediate: true,
  }
);

defineExpose({
  expand,
  collapse,
});
</script>
