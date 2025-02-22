<template>
  <div class="flex flex-col gap-y-3 select-none px-5">
    <div v-for="item in list" :key="item.id">
      <div class="flex justify-between items-center">
        <div class="flex-1 flex flex-col gap-y-1.5 mr-2">
          <NuxtLink :to="'/essay/' + item.id">
            <h2
              class="text-[rgb(152,192,246)] dark:text-pink-400 text-lg font-bold hover:underline font-serif"
            >
              {{ item.name }}
            </h2>
          </NuxtLink>

          <small
            class="text-xs text-gray-500 dark:text-gray-500 line-clamp-2 font-serif"
          >
            {{ item.introduction }}
          </small>

          <div class="flex items-center my-0.5">
            <small class="flex items-center text-gray-300 dark:text-gray-600">
              <MyIconView></MyIconView>
              <span class="ml-[2px]">
                {{ item.visitedTimes }}
              </span>
            </small>

            <small
              class="flex ml-2 items-center text-gray-300 dark:text-gray-600"
            >
              <MyIconComment></MyIconComment>
              <span class="ml-[2px]">
                {{ item.visitedTimes }}
              </span>
            </small>

            <div
              class="hidden md:flex ml-auto mr-10 items-center text-gray-400 dark:text-pink-800"
            >
              <NuxtLink
                class="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800"
                :to="'/label/' + label.id + '/1'"
                v-for="label in item.labelList"
              >
                {{ label.name }}
              </NuxtLink>
            </div>
          </div>

          <small class="text-gray-400 dark:text-gray-700">
            <span class="line-clamp-1">
              {{ formateDate(item.createdTime) }}
            </span>
          </small>
        </div>

        <NuxtLink :to="'/essay/' + item.id">
          <el-image
            :src="imgPre + item.img.url"
            class="h-[82px] w-[128px] md:h-[90px] md:w-[160px] overflow-hidden rounded-lg dark:opacity-60"
            fit="cover"
            :key="genRandomKey()"
            lazy
          >
          </el-image>
        </NuxtLink>
      </div>
      <div class="h-[1px] my-1 bg-gray-100 dark:bg-gray-700"></div>
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
