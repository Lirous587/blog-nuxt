<template>
  <div class="header-box">
    <div class="pl-5 w-[55%] flex items-center gap-x-6">
      <NuxtLink to="/" class="nav">
        <div class="text-lg title-name">罹景的博客</div>
      </NuxtLink>
      <NuxtLink to="/" class="nav">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a7;</span>
          <span class="title-kind">首页</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/heart-word" class="nav">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a6;</span>
          <span class="title-kind">心语</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/friend-link" class="nav">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a5;</span>
          <span class="title-kind">友情链接</span>
        </div>
      </NuxtLink>
      <!-- about -->
      <el-dropdown class="nav border-none outline-transparent">
        <NuxtLink to="/about" class="whitespace-nowrap outline-transparent">
          <span class="iconfont">&#xe8a4;</span>
          <span class="title-kind">关于</span>
          <el-icon>
            <arrow-down />
          </el-icon>
        </NuxtLink>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <NuxtLink to="/introdution" class="flex items-center">
                <el-icon><VideoCamera /></el-icon>
                博客介绍
              </NuxtLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <NuxtLink to="/knowledge" class="flex items-center">
                <el-icon><Collection /></el-icon>
                知识库
              </NuxtLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="pr-5 w-[45%] flex items-center gap-x-4 justify-end">
      <div class="pl-5">
        <UserSearchData></UserSearchData>
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

<style scoped>
.header-box {
  @apply fixed flex justify-between  top-0 right-0 shadow-lg h-[60px] w-full z-10;
  backdrop-filter: blur(20px) saturate(5);
  -webkit-backdrop-filter: blur(10px); /* 为Safari浏览器添加前缀 */
}

.title-name {
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
.title-kind {
  @apply cursor-pointer text-lg whitespace-nowrap;
  text-align: center;
  background: linear-gradient(to right, rgb(18, 111, 219), rgb(204, 129, 17));
  color: transparent;
  background-clip: text;
}
.iconfont {
  font-family: "iconfont" !important;
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
