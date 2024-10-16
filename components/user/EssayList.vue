<template>
  <el-card
    v-for="item in list"
    :key="item.id"
    shadow="always"
    class="!rounded-xl hover:!shadow-lg my-4 bg-gradient-to-br from-pink-50 to-green-100"
  >
    <div class="flex items-center">
      <NuxtLink :to="'essay/' + item.id">
        <el-image
          :src="imgUrlPre + '/' + item.imgUrl"
          fit="cover"
          loading="lazy"
          lazy
          class="w-[160px] h-[90px] lg:w-[208px] lg:h-[117px] flex-shrink-0 rounded-lg shadow-lg p-1"
        ></el-image>
      </NuxtLink>
      <div class="flex flex-col flex-1 ml-2 gap-y-2 flex-wrap">
        <NuxtLink :to="'essay/' + item.id">
          <span
            class="text-lg font-bold hover:text-blue-500 transition-all duration-200"
            >{{ item.name }}</span
          >
        </NuxtLink>

        <div>
          <el-text class="text-sm text-gray-500" :line-clamp="1">
            {{ item.introduction }}
          </el-text>
        </div>

        <div class="flex gap-2 flex-wrap">
          <el-tag type="primary" class="cursor-pointer">
            <div class="flex items-center">
              <el-icon><Menu /></el-icon>
              <span>
                {{ item.kind }}
              </span>
            </div>
          </el-tag>
          <el-tag
            type="info"
            v-for="label in item.label"
            class="cursor-pointer"
          >
            {{ label }}
          </el-tag>
        </div>

        <small class="flex justify-between text-xs text-gray-400">
          <div>
            <span
              class="inline-block ml-2 w-2 h-2 leading-2 rounded-full border border-gray-400"
            ></span>
            <span class="ml-1">
              {{ formateDate(item.createdTime) }}
            </span>
          </div>
          <div class="flex items-center gap-x-1">
            <el-icon size="14"><View /></el-icon>
            {{ item.visitedTimes }}
          </div>
        </small>
      </div>
    </div>
  </el-card>
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

<style></style>
