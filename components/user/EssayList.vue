<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
    <div v-for="item in list" :key="item.id">
      <div
        class="relative border hover:!border-yellow-200 rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg dark:bg-black dark:border-gray-800"
      >
        <div
          v-if="item.ifRecommend || item.ifTop"
          class="absolute z-10 top-0 left-0 w-[40px] h-[40px] flex items-center justify-center bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 shadow-sm rounded-br-3xl"
          :class="
            item.ifTop
              ? 'from-green-300 to-yellow-200'
              : 'from-pink-300 to-red-300'
          "
        >
          <div v-if="item.ifTop">
            <svg width="24" height="24" viewBox="0 0 50 50" fill="none">
              <path
                d="M24.0083 14.1006V42.0001"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 26L24 14L36 26"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 6H36"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div v-else>
            <svg width="18" height="18" viewBox="0 0 50 50" fill="none">
              <path
                d="M24 44C32.2347 44 38.9998 37.4742 38.9998 29.0981C38.9998 27.0418 38.8953 24.8375 37.7555 21.4116C36.6157 17.9858 36.3861 17.5436 35.1809 15.4279C34.666 19.7454 31.911 21.5448 31.2111 22.0826C31.2111 21.5231 29.5445 15.3359 27.0176 11.6339C24.537 8 21.1634 5.61592 19.1853 4C19.1853 7.06977 18.3219 11.6339 17.0854 13.9594C15.8489 16.2849 15.6167 16.3696 14.0722 18.1002C12.5278 19.8308 11.8189 20.3653 10.5274 22.4651C9.23596 24.565 9 27.3618 9 29.4181C9 37.7942 15.7653 44 24 44Z"
                fill="none"
                stroke="red"
                stroke-width="4"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div
          v-if="item.ifRecommend || item.ifTop"
          class="absolute z-10 bottom-0 right-0 w-[35px] h-[35px] bg-gradient-to-r dark:from-black dark:to-black shadow-sm rounded-tl-full from-pink-100 to-indigo-100"
        ></div>

        <NuxtLink
          :to="'/essay/' + item.id"
          class="flex justify-center w-full h-[180px] md:h-[250px] lg:h-[200px]"
        >
          <el-image
            :src="imgPre + item.img.url"
            fit="cover"
            class="w-full lg:h-auto shadow-lg bg-cyan-100 dark:bg-black ease-in-out hover:animate-pulse"
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
              <span class="line-clamp-1">
                {{ formateDate(item.createdTime) }}
              </span>
              <span class="mx-1">|</span>
              <el-icon size="14"><View /></el-icon>
              {{ item.visitedTimes }}
            </div>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imgPre = useRuntimeConfig().public.imgBase + "/";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
* {
  font-family: "myFont";
}
:deep(.el-card) {
  border: none;
}
</style>
