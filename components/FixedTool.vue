<template>
  <div
    class="fixed bottom-[60px] right-[20px] flex flex-col gap-y-3 z-50 transition-all duration-500"
    :class="tollOpcity"
  >
    <div
      class="flex items-center justify-center px-1 py-2 rounded-lg bg-blue-100 dark:bg-neutral-200"
    >
      <MyIconToTop class="scale-125 text-gray-500" @click="scrollToTop">
      </MyIconToTop>
    </div>

    <slot />
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const tollOpcity = ref("hidden opacity-0 translate-x-[calc(100%+25px)]");

const scroll = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 700) {
    tollOpcity.value = "opacity-100 translate-x-[0px]";
  } else {
    tollOpcity.value = "opacity-0 translate-x-[calc(100%+25px)]";
  }
};

const throttleScroll = throttle(scroll, 200);

onMounted(() => {
  window.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", throttleScroll);
});
</script>
