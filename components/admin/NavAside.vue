<template>
  <div class="flex justify-start my-2 ml-4 items-center">
    <el-icon
      v-if="isCollapse"
      size="30"
      @click="isCollapse = false"
      color="rgb(75,217,127)"
      ><Expand
    /></el-icon>
    <el-icon
      v-if="!isCollapse"
      size="30"
      @click="isCollapse = true"
      color="rgb(75,217,127)"
      ><Fold
    /></el-icon>
  </div>

  <el-menu :collapse="isCollapse" :default-active="defaultActive">
    <el-menu-item index="/admin">
      <el-icon><PieChart /></el-icon>
      <template #title>
        <NuxtLink to="/admin">
          <span> 数据展示</span>
        </NuxtLink>
      </template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Notebook /></el-icon>
        <span>文章操作</span>
      </template>
      <NuxtLink to="/admin/essay/create">
        <el-menu-item index="/admin/essay/create"> 创建文章 </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/essay/manage">
        <el-menu-item index="/admin/essay/manage"> 管理文章 </el-menu-item>
      </NuxtLink>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><Files /></el-icon>
        <span>分类标签</span>
      </template>

      <NuxtLink to="/admin/manageKind">
        <el-menu-item index="/admin/manageKind"> 管理分类 </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/manageLabel">
        <el-menu-item index="/admin/manageLabel"> 管理标签 </el-menu-item>
      </NuxtLink>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
const route = useRoute();

const isCollapse = ref(false);

const defaultActive = ref("/admin");

watch(
  () => route.path,
  () => {
    defaultActive.value = route.path;
  },
  {
    immediate: true,
  }
);
</script>
