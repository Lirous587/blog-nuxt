<template>
  <div>
    <slot></slot>
    <div class="flex flex-col gap-y-2">
      <div v-for="item in list">
        <NuxtLink
          :key="item.id"
          :to="'/essay/' + item.id"
          class="flex items-center justify-between"
        >
          <div class="flex flex-col">
            <div class="flex items-center w-full">
              <el-image
                class="w-[80px] h-[45px] rounded-lg flex-shrink-0 transition-transform duration-300 hover:scale-110 dark:opacity-60"
                :src="imgPre + item.img.url"
                fit="cover"
                :key="genRandomKey()"
                lazy
              ></el-image>
              <div
                class="ml-5 text-sm text-pink-400 text-ellipsis transition-transform duration-300 hover:scale-110 hover:underline"
              >
                {{ item.name }}
              </div>
            </div>
            <small class="text-xs my-1 text-gray-300 dark:text-gray-600">
              {{ formateDate(item.createdTime) }}
            </small>
          </div>
        </NuxtLink>
        <div class="h-[1px] bg-pink-100 dark:bg-gray-600 border-dotted"></div>
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
