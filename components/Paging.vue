<template>
  <div class="flex justify-center" v-if="pageConfim()">
    <!-- last -->
    <div :class="ifMin ? 'cursor-not-allowed' : ''">
      <NuxtLink
        :to="preHref + '/' + Math.max(1, currentPage - Number(1))"
        class="h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 flex items-center justify-center shadow-sm hover:shadow-md bg-neutral-200 text-white dark:bg-gray-500 hover:bg-blue-300 dark:hover:bg-gray-400 transition-all duration-200"
        :class="ifMin ? 'pointer-events-none' : ''"
      >
        <el-icon><ArrowLeft /></el-icon>
      </NuxtLink>
    </div>

    <!-- middle -->
    <NuxtLink
      v-for="(item, index) in list"
      :to="preHref + '/' + item.page"
      :key="index"
      class="bg-neutral-200 hover:text-blue-300 hover:shadow-md h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 text-white transition-all duration-200 shadow-sm"
      :class="{
        'bg-sky-400 dark:bg-pink-600': item.page == currentPage,
        'pointer-events-none': item.page == currentPage,
      }"
    >
      {{ item.value }}
    </NuxtLink>

    <!-- next -->
    <div :class="ifMax ? 'cursor-not-allowed' : ''">
      <NuxtLink
        :to="preHref + '/' + Math.min(totalPage, currentPage + Number(1))"
        class="h-[2em] w-[2em] rounded-md leading-[2em] text-center mx-2 flex items-center justify-center shadow-sm hover:shadow-md bg-neutral-200 text-white dark:bg-gray-500 hover:bg-blue-300 dark:hover:bg-gray-400 transition-all duration-200"
        :class="ifMax ? 'cursor-not-allowed pointer-events-none' : ''"
      >
        <el-icon><ArrowRight /></el-icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const list = ref([]);
const offset = 2;
const route = useRoute();
const currentPage = parseInt(route.params.page) || 1;

const props = defineProps({
  totalPage: {
    type: Number,
    require: true,
  },
  preHref: {
    type: String,
    default: "/page",
  },
});

const pageConfim = () => {
  return typeof props.totalPage === "number";
};

const initList = () => {
  if (!pageConfim()) return;
  if (props.totalPage <= 3 + offset * 2) {
    return Array.from({ length: props.totalPage }, (_, i) => {
      return {
        value: i + 1,
        page: i + 1,
      };
    });
  }
  let middelArr = [];
  let start = Math.max(2, currentPage - offset);
  let end = Math.min(props.totalPage - 1, currentPage + offset);
  middelArr = Array.from(
    {
      length: end - start + 1,
    },
    (_, i) => i + start
  );
  if (middelArr[0] - 1 > 1) {
    middelArr.unshift("...");
  }
  if (props.totalPage - middelArr[middelArr.length - 1] > 1) {
    middelArr.push("...");
  }
  let resultArr = [1, ...middelArr, props.totalPage].map((o, index) => {
    return {
      value: o,
      page: index + 1,
    };
  });
  return resultArr;
};
list.value = initList();

const ifMin = computed(() => {
  return currentPage === 1 ? true : false;
});

const ifMax = computed(() => {
  return currentPage === props.totalPage ? true : false;
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-mono;
}
</style>
