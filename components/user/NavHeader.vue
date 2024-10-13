<template>
  <div class="h-[100%] header-box flex justify-between">
    <div class="pl-5 w-[55%] flex items-center gap-x-6">
      <NuxtLink to="/">
        <div class="text-lg title-name">罹景的博客</div>
      </NuxtLink>
      <NuxtLink to="/">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a7;</span>
          <span class="title-kind">首页</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/heart-word">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a6;</span>
          <span class="title-kind">心语</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/friend-link">
        <div class="flex items-center">
          <span class="iconfont">&#xe8a5;</span>
          <span class="title-kind">友情链接</span>
        </div>
      </NuxtLink>
      <!-- about -->
      <el-dropdown>
        <NuxtLink to="/about" class="whitespace-nowrap">
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
  @apply fixed left-0 top-0 right-0 h-[60px] z-10;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
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
</style>
