<template>
  <div v-for="(item, index) in list" :key="item.id">
    <el-card
      shadow="always"
      class="!rounded-xl mx-10 my-8 hover:!shadow-lg bg-gradient-to-br from-pink-50 to-green-100 dark:from-gray-700 dark:to-gray-700"
    >
      <div class="flex flex-col justify-center lg:flex-row lg:items-center">
        <NuxtLink
          :to="'/essay/' + item.id"
          class="flex justify-center order-0 mx-3 lg:order-2 my-2 lg:w-[192px] lg:h-[108px] xl:w-[288px] xl:h-[172px]"
        >
          <el-image
            :src="imgPre + item.img.url"
            fit="cover"
            class="w-full h-[180px] lg:h-auto rounded-lg shadow-lg p-2 bg-cyan-100 dark:bg-black transition-transform duration-300 ease-in-out hover:scale-110"
            lazy
          >
          </el-image>
        </NuxtLink>

        <div
          class="flex flex-col mx-3 order-1 justify-around flex-1 gap-y-1 flex-wrap"
          :class="index % 2 === 0 ? 'order-3' : 'order-1'"
        >
          <NuxtLink
            :to="'/essay/' + item.id"
            class="text-black dark:text-white"
          >
            <span
              class="text-lg line-clamp-1 transition-transform duration-300 hover:scale-105 hover:text-blue-500 dark:hover:text-blue-950 hover:underline"
            >
              {{ item.name }}
            </span>
          </NuxtLink>

          <div class="text-sm text-gray-500 line-clamp-1">
            {{ item.introduction }}
          </div>

          <div class="flex flex-wrap items-center">
            <span class="line-clamp-1 md:line-clamp-2 lg:line-clamp-3">
              <el-tag type="primary" class="mr-2 mb-1">
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
                class="mr-2 mb-1"
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

          <small class="hidden justify-between text-xs text-gray-400 lg:flex">
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
    </el-card>
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
