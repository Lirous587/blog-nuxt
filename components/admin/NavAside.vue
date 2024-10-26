<template>
  <el-menu default-active="1" class="el-menu-vertical-demo">
    <el-menu-item index="1">
      <el-icon>
        <Menu />
      </el-icon>
      <template #title>
        <NuxtLink to="/admin">
          <span> 数据展示</span>
        </NuxtLink>
      </template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>文章操作</span>
      </template>
      <NuxtLink to="/admin/createEssay">
        <el-menu-item index="1-1"> 创建文章 </el-menu-item>
      </NuxtLink>

      <el-menu-item index="1-2">
        <!-- <NuxtLink to="/admin/managerEssay"> 管理文章 </NuxtLink> -->
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const activeToolRoute = ref("/");

const menu = [
  {
    name: "数据展示",
    route: "/",
    icon: "DataLine",
  },
  {
    name: "创建文章",
    route: "/createEssay",
    icon: "FolderAdd",
  },
  {
    name: "管理文章",
    route: "/manageEssay",
    icon: "EditPen",
  },
  {
    name: "修改数据",
    route: "/updateData",
    icon: "Operation",
  },
];

const switchTool = (item) => {
  router.push(`${config.MANAGER_URL}${item.route}`);
};

const initActiveToolBar = () => {
  if (route.path.split("/").length > 3) {
    activeToolRoute.value = "/" + route.path.split("/")[3];
  } else {
    activeToolRoute.value = "/";
  }
};
initActiveToolBar();
watch(
  () => route.path,
  () => {
    initActiveToolBar();
  }
);
</script>

<style scoped>
.nav-aside {
  @apply fixed;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  color: rgb(224, 218, 218);
  background-color: beige;
  transition: width 0.5s linear;
  color: black;
}
.nav-aside div {
  animation: nav-aside-action 0.5s linear;
}
.nav-aside div div span {
  animation: nav-aside-action 0.5s linear;
}
@keyframes nav-aside-action {
  0%,
  90% {
    opacity: 0;
    font-size: 0;
  }
  100% {
    opacity: 1;
    font-size: initial;
  }
}

.nav-aside-head {
  @apply flex justify-around text-xl p-2;
  background-color: rgb(35, 162, 217);
}

.nav-aside-item {
  @apply flex justify-around mt-6 text-lg;
}

.nav-aside-item:hover {
  cursor: pointer;
  color: rgba(28, 104, 192, 0.825);
}

.active {
  color: rgb(182, 20, 231);
}
</style>
