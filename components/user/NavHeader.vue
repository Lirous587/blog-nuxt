<template>
  <div class="headerContainer">
    <div class="pl-5 flex items-center gap-x-8 sm:flex-shrink-0">
      <div class="lg:hidden flex items-center">
        <HamburgerIcon
          color="red"
          :size="20"
          @update:model-value="selectOpen"
          ref="iconRef"
        ></HamburgerIcon>
        <el-drawer
          v-model="mobileMenuVisiable"
          :open-delay="250"
          title="文章导航"
          size="70%"
          direction="ltr"
          append-to-body
          @close="iconRef.close()"
        >
          <UserNavAside></UserNavAside>
        </el-drawer>
      </div>
      <NuxtLink to="/" class="nav hidden lg:block">
        <div class="text-lg color-text flex-shrink-0">Lirous的日记本</div>
      </NuxtLink>
      <NuxtLink to="/" class="nav">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a7;</span>
          <span class="color-text">首页</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/heartWord" class="nav hidden lg:block">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a6;</span>
          <span class="color-text">心语</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/friendLink" class="nav hidden lg:block">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a5;</span>
          <span class="color-text">友链</span>
        </div>
      </NuxtLink>
      <!-- about -->
      <el-dropdown class="nav border-none">
        <div
          to="/about"
          class="whitespace-nowrap outline-transparent hidden lg:block"
        >
          <span class="iconfont">&#xe8a4;</span>
          <span class="color-text">关于</span>
          <el-icon>
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <NuxtLink
                target="_blank"
                to="https://github.com/Lirous587"
                class="flex items-center"
              >
                <el-icon color="red" size="16"><Star /></el-icon>
                关于作者
              </NuxtLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <NuxtLink to="/knowledge" class="flex items-center">
                <el-icon color="red"><Collection /></el-icon>
                知识库
              </NuxtLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="pr-5 flex items-center gap-x-4 justify-end">
      <div class="pl-5">
        <UserSearchEssay></UserSearchEssay>
      </div>
      <div
        class="h-[30px] w-[30px] flex flex-shrink-0 justify-center items-center bg-red-100 rounded-full"
      >
        <el-icon>
          <Moon></Moon>
        </el-icon>
      </div>
      <div>
        <el-button type="primary" round class="px-3">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const mobileMenuVisiable = ref(false);
const iconRef = ref(null);

const selectOpen = (status) => {
  mobileMenuVisiable.value = status;
};

const route = useRoute();
watch(route, () => {
  mobileMenuVisiable.value = false;
});

const top = ref("0");

let lastTop = 0;
let nowTop = 0;

const scroll = (event) => {
  nowTop = event.target.scrollingElement.scrollTop;
  if (nowTop > lastTop) {
    top.value = "-60px";
  } else {
    top.value = "0px";
  }
  lastTop = nowTop;
};
const throttleScroll = throttle(scroll);

onMounted(() => {
  document.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener("scroll", throttleScroll);
});
</script>

<style scoped>
* {
  font-family: "myFont";
}

.headerContainer {
  @apply bg-white backdrop-blur-sm bg-opacity-90 fixed flex justify-between top-0 right-0 shadow-lg h-[60px] w-full z-10 transition-all duration-500 ease-linear;
  transform: translateY(v-bind(top));
}

.color-text {
  @apply cursor-pointer text-lg whitespace-nowrap;
  text-align: center;
  background: linear-gradient(
    to right,
    rgb(67, 102, 218),
    rgb(91, 112, 208),
    rgb(255, 153, 0)
  );
  color: transparent;
  background-clip: text;
}

.iconfont {
  font-family: "iconfont";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav {
  @apply duration-300 relative  hover:scale-125;
}
.nav::after {
  content: "";
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transform  duration-500 ease-in-out;
}
.nav:hover::after {
  @apply w-full;
}
</style>
