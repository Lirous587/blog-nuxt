<template>
  <div
    class="select-none grid grid-cols-1 min-w-[300px] md:grid-cols-2 md:min-w-[600px] gap-3 overflow-auto"
  >
    <div v-for="item in list" :key="item.id">
      <div
        class="relative border border-pink-300 hover:!border-yellow-200 rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg dark:bg-black dark:border-gray-800"
      >
        <NuxtLink
          :to="'/essay/' + item.id"
          class="flex justify-center w-full h-[180px] md:h-[250px] lg:h-[200px] overflow-hidden"
        >
          <el-image
            :src="imgPre + item.img.url"
            class="w-full lg:h-auto shadow-lg bg-cyan-100 dark:bg-gray-800 ease-in-out dark:opacity-60 hover:animate-pulse hover:scale-120 transition-transform duration-500"
            fit="cover"
            :key="genRandomKey()"
            lazy
          >
          </el-image>
        </NuxtLink>

        <div class="flex flex-col mx-3 gap-y-1 flex-wrap py-2">
          <NuxtLink
            :to="'/essay/' + item.id"
            class="text-black dark:text-neutral-300"
          >
            <span
              class="text-lg text-ellipsis transition-transform duration-300 hover:scale-105 hover:text-blue-500 dark:hover:text-blue-950 hover:underline"
            >
              {{ item.name }}
            </span>
          </NuxtLink>

          <div class="text-sm text-gray-500 line-clamp-1">
            {{ item.introduction }}
          </div>

          <div class="flex flex-wrap items-center">
            <span class="line-clamp-1 md:line-clamp-2 lg:line-clamp-3">
              <el-tag
                type="primary"
                class="mr-2 mb-1 dark:!bg-black dark:text-gray-500 dark:border-gray-700"
              >
                <NuxtLink :to="'/kind/' + item.kindID + '/1'">
                  <div class="flex items-center text-xs">
                    <el-icon><Menu /></el-icon>
                    <span>
                      {{ item.kindName }}
                    </span>
                  </div>
                </NuxtLink>
              </el-tag>
              <el-tag
                type="info"
                class="mr-2 mb-1 dark:!bg-black dark:text-gray-500 dark:border-gray-700"
                v-for="label in item.labelList"
              >
                <NuxtLink
                  class="line-clamp-1 md:line-clamp-2 lg:line-clamp-3"
                  :to="'/label/' + label.id + '/1'"
                >
                  {{ label.name }}
                </NuxtLink>
              </el-tag>
            </span>
          </div>

          <small class="justify-between text-xs text-gray-400 flex">
            <div class="flex items-center gap-x-1">
              <el-icon><Calendar /></el-icon>
              <span class="line-clamp-1 number-font">
                {{ formateDate(item.createdTime) }}
              </span>
              <span class="mx-1">|</span>
              <el-icon size="14"><View /></el-icon>
              <span class="number-font">
                {{ item.visitedTimes }}
              </span>
            </div>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imgPre = useRuntimeConfig().public.imgGalleryBase;

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-serif;
}

.number-font {
  @apply font-sans;
}
</style>
