<template>
  <div style="timeline-scope: --t1, --t2, --t3, --t4, --t5, --t6">
    <div>
      <div class="content" style="--s: --t1">
        <h1>标签1</h1>
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
      </div>
      <div class="content" style="--s: --t2">
        <h1>标签2</h1>
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
      </div>
      <div class="content" style="--s: --t3">
        <h1>标签3</h1>
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
      </div>
      <div class="content" style="--s: --t4">
        <h1>标签4</h1>
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
        <img :src="imgPre + '12.png'" alt="" />
      </div>
    </div>

    <nav>
      <a href="#t1" style="--s: --t1">一、标题一</a>
      <a href="#t2" style="--s: --t2">二、标题二</a>
      <a href="#t3" style="--s: --t3">三、标题三</a>
      <a href="#t4" style="--s: --t4">四、标题四</a>
      <a href="#t5" style="--s: --t5">五、标题五</a>
      <a href="#t6" style="--s: --t6">六、标题六</a>
    </nav>
  </div>


</template>

<script setup>
const imgPre = useRuntimeConfig().public.imgBase + "/";

definePageMeta({
  middleware: "index-data",
});
</script>

<style scoped>
@keyframes active {
  0% {
    background-color: #ff0000;
  }
  100% {
    background-color: #6f00ff;
  }
}
img {
  height: 200px;
  display: block;
}
.content {
  view-timeline-name: var(--s);
  view-timeline-inset: 50%;
}
nav {
  position: fixed;
  right: 20px;
  top: 10px;
  display: flex;
  flex-direction: column;
}
nav > a {
  animation: active;
  animation-timeline: var(--s);
  display: block;
}
</style>
