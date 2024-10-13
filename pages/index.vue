<template>
  <div class="h-[2000px]">
    要给背景添加毛玻璃效果,我们可以使用CSS的backdrop-filter属性。这里是如何修改你的CSS代码来实现这个效果:
    ```css .header-box { @apply fixed left-0 top-0 right-0 h-[60px] z-10;
    background-color: rgba(255, 255, 255, 0.5); /* 半透明白色背景 */
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); /*
    为Safari浏览器添加前缀 */ } ``` 这里解释一下新添加的属性: 1.
    `background-color: rgba(255, 255, 255, 0.5);`
    设置一个半透明的白色背景。你可以根据需要调整颜色和透明度。 2.
    `backdrop-filter: blur(10px);`
    这是创建毛玻璃效果的关键。它会对元素背后的内容应用10像素的模糊效果。 3.
    `-webkit-backdrop-filter: blur(10px);`
    这是为了兼容Safari浏览器而添加的前缀版本。 4.
    模糊程度(10px)可以根据你想要的效果进行调整。数值越大，模糊效果越强。
    请注意，`backdrop-filter`属性在一些老旧的浏览器中可能不被支持。在这些浏览器中，效果会回退到普通的半透明背景。
    你想让我详细解释这个效果是如何工作的，或者需要我提供一些其他的样式建议吗？
  </div>
</template>

<script setup lang="ts">
const keywords = ref(["关键词1", "关键词2", "关键词3"]);
const metaKeywords = computed(() => keywords.value.join(","));
const title = ref("网站标题");
const metaTitle = computed(() => title.value);
useHead({
  title: metaTitle,
  meta: [{ name: "keywords", content: metaKeywords }],
});

const count = useState("count", () => 0);
if (import.meta.server) {
  count.value++;
}
console.log(useState("count").value);
</script>
