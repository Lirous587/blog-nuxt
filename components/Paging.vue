<template>
  <div class="flex justify-center">
    <NuxtLink
      :to="preHref + '/' + Math.max(1, currentPage - Number(1))"
      class="bg-neutral-200 text-neutral-400 h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 flex items-center justify-center"
    >
      <el-icon><DArrowLeft /></el-icon>
    </NuxtLink>
    <NuxtLink
      v-for="(item, index) in list"
      :to="preHref + '/' + item.page"
      :key="index"
      class="bg-neutral-200 h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 text-white"
      :class="{ '!bg-sky-400': item.page == currentPage }"
    >
      {{ item.value }}
    </NuxtLink>
    <NuxtLink
      :to="preHref + '/' + Math.min(totalPages, currentPage + Number(1))"
      class="bg-neutral-200 text-neutral-400 h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 flex items-center justify-center"
    >
      <el-icon><DArrowRight /></el-icon>
    </NuxtLink>
  </div>
</template>

<script setup>
const list = ref([]);
const offset = 2;
const route = useRoute();
const currentPage = parseInt(route.params.page) || 1;

const props = defineProps({
  totalPages: {
    type: Number,
    require: true,
  },
  preHref: {
    type: String,
    default: "/page",
  },
});

const initList = () => {
  if (props.totalPages <= 3 + offset * 2) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }
  let middelArr = [];
  let start = Math.max(2, currentPage - offset);
  let end = Math.min(props.totalPages - 1, currentPage + offset);
  middelArr = Array.from(
    {
      length: end - start + 1,
    },
    (_, i) => i + start
  );
  if (middelArr[0] - 1 > 1) {
    middelArr.unshift("...");
  }
  if (props.totalPages - middelArr[middelArr.length - 1] > 1) {
    middelArr.push("...");
  }
  let resultArr = [1, ...middelArr, props.totalPages].map((o, index) => {
    return {
      value: o,
      page: index + 1,
    };
  });
  return resultArr;
};
list.value = initList();
</script>
