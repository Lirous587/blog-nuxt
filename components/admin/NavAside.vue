<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="defaultActive"
    :unique-opened="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Coin /></el-icon>
        <span>首页</span>
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

    <!-- 人物 -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Connection /></el-icon>
        <span>人物</span>
      </template>
      <NuxtLink to="/admin/user">
        <el-menu-item index="/admin/user">
          <el-icon><User /></el-icon>
          <template #title>
            <span>用户</span>
          </template>
        </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/friendLink">
        <el-menu-item index="/admin/friendLink">
          <el-icon><Position /></el-icon>
          <template #title>
            <span>友链</span>
          </template>
        </el-menu-item>
      </NuxtLink>
    </el-sub-menu>

    <!-- 文章 -->
    <el-sub-menu index="3">
      <template #title>
        <el-icon><EditPen /></el-icon>
        <span>文章</span>
      </template>
      <NuxtLink to="/admin/essay">
        <el-menu-item index="/admin/essay">
          <el-icon><Notebook /></el-icon>
          <template #title>
            <span>文章</span>
          </template>
        </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/essay/kind">
        <el-menu-item index="/admin/essay/kind">
          <el-icon><Folder /></el-icon>
          <template #title>
            <span>分类</span>
          </template>
        </el-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/essay/label">
        <el-menu-item index="/admin/essay/label">
          <el-icon><Files /></el-icon>
          <template #title>
            <span>标签</span>
          </template>
        </el-menu-item>
      </NuxtLink>
    </el-sub-menu>

    <!-- 时间轴 -->
    <NuxtLink to="/admin/timeEvent">
      <el-menu-item index="/admin/timeEvent">
        <el-icon><Calendar /></el-icon>
        <template #title>
          <span>时间轴</span>
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

    <!-- 图库 -->
    <NuxtLink to="/admin/gallery">
      <el-menu-item index="/admin/gallery">
        <el-icon><Picture /></el-icon>
        <template #title>
          <span>图库</span>
        </template>
      </el-menu-item>
    </NuxtLink>
    
    <!-- 邮件 -->
    <NuxtLink to="/admin/email">
      <el-menu-item index="/admin/email">
        <el-icon><Message /></el-icon>
        <template #title>
          <span>邮件</span>
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
