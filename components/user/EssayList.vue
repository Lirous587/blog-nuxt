<template>
  <div>
    <el-card
      v-for="item in list"
      :key="item.id"
      shadow="always"
      class="!rounded-xl mx-10 my-8 hover:!shadow-lg bg-gradient-to-br from-pink-50 to-green-100"
    >
      <div class="flex flex-col justify-center lg:flex-row lg:items-center">
        <NuxtLink
          :to="'/essay/' + item.id"
          class="flex justify-center order-1 my-2 lg:mr-4 lg:w-[160px] lg:h-[90px] xl:w-[240px] xl:h-[135px]"
        >
          <el-image
            :src="imgUrlPre + '/' + item.imgUrl"
            fit="cover"
            class="w-full h-[180px] lg:h-auto rounded-lg shadow-lg p-2 bg-cyan-100"
            lazy
          >
          </el-image>
        </NuxtLink>

        <div
          class="flex flex-col lg:order-2 justify-around flex-1 gap-y-1 flex-wrap"
        >
          <NuxtLink :to="'/essay/' + item.id">
            <span
              class="text-lg hover:text-blue-500 transition-all duration-200 line-clamp-1"
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
              <span
                class="inline-block w-2 ml-1 h-2 rounded-full border border-gray-400"
              ></span>
              <span class="line-clamp-1">
                {{ formateDate(item.createdTime) }}
              </span>
            </div>
            <div class="flex items-center gap-x-1">
              <el-icon size="14"><View /></el-icon>
              {{ item.visitedTimes }}
            </div>
          </small>
        </div>

        <small class="flex justify-between text-xs text-gray-400 lg:hidden">
          <div class="flex items-center gap-x-1">
            <span
              class="inline-block w-2 ml-1 h-2 rounded-full border border-gray-400"
            ></span>
            <span class="line-clamp-1">
              {{ formateDate(item.createdTime) }}
            </span>
          </div>
          <div class="flex items-center gap-x-1">
            <el-icon size="14"><View /></el-icon>
            {{ item.visitedTimes }}
          </div>
        </small>
      </div>
    </el-card>
  </div>
</template>
<script setup>
const imgUrlPre = useRuntimeConfig().public.imgBase;

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
</style>
