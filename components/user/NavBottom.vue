<template>
  <div
    class="fixed w-full bottom-0 h-[45px] z-10 flex items-center justify-around lg:hidden"
  >
    <NuxtLink to="/">
      <div class="flex items-center">
        <span class="iconfont">&#xe8a7;</span>
        <span class="color-text">首页</span>
      </div>
    </NuxtLink>

    <NuxtLink to="/heartWords/1">
      <div class="flex items-center">
        <span class="iconfont">&#xe8a6;</span>
        <span class="color-text">心语</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/friendLink">
      <div class="flex items-center">
        <span class="iconfont">&#xe8a5;</span>
        <span class="color-text">友链</span>
      </div>
    </NuxtLink>

    <NuxtLink to="/knowledge">
      <div class="flex items-center">
        <span class="iconfont">&#xe8a4;</span>
        <span class="color-text">知识库</span>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.iconfont {
  font-family: "iconfont";
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

* {
  font-family: "myFont";
}
</style>
