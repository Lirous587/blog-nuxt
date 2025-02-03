<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="defaultActive"
    :unique-opened="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Coin /></el-icon>
        <span>首页数据</span>
      </template>
      <NuxtLink to="/admin">
        <el-menu-item index="/admin/1">
          <el-icon><PieChart /></el-icon>
          <template #title>
            <span>面板</span>
          </template>
        </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin">
        <el-menu-item index="/admin/2">
          <el-icon><PieChart /></el-icon>
          <template #title>
            <span>面板2</span>
          </template>
        </el-menu-item>
      </NuxtLink>
    </el-sub-menu>

    <NuxtLink to="/admin/essay">
      <el-menu-item index="/admin/essay">
        <el-icon><Notebook /></el-icon>
        <span>文章模块</span>
      </el-menu-item>
    </NuxtLink>

    <!-- 分类 -->
    <NuxtLink to="/admin/kind">
      <el-menu-item index="/admin/kind">
        <el-icon><Folder /></el-icon>
        <template #title>
          <span>分类</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 标签 -->
    <NuxtLink to="/admin/label">
      <el-menu-item index="/admin/label">
        <el-icon><Files /></el-icon>
        <template #title>
          <span>标签</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 心语 -->
    <NuxtLink to="/admin/heartWord">
      <el-menu-item index="/admin/heartWord">
        <el-icon><IceTea /></el-icon>
        <template #title>
          <span>心语</span>
        </template>
      </el-menu-item>
    </NuxtLink>

    <!-- 轮播图 -->
    <NuxtLink to="/admin/carousel">
      <el-menu-item index="/admin/carousel">
        <el-icon><Film /></el-icon>
        <template #title>
          <span>轮播图</span>
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
        <el-icon><Picture /></el-icon>
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
