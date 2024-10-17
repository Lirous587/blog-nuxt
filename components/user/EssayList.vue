<template>
  <el-card
    v-for="item in list"
    :key="item.id"
    shadow="always"
    class="!rounded-xl hover:!shadow-lg my-8 bg-gradient-to-br from-pink-50 to-green-100"
  >
    <div class="flex items-center">
      <NuxtLink
        :to="'/essay/' + item.id"
        class="w-[160px] h-[90px] lg:w-[208px] lg:h-[117px] flex-shrink-0 bg-cyan-100"
      >
        <el-image
          :src="imgUrlPre + '/' + item.imgUrl"
          fit="cover"
          loading="lazy"
          lazy
          class="rounded-lg shadow-lg p-2"
        >
        </el-image>
      </NuxtLink>

      <div class="flex flex-col justify-around flex-1 ml-2 gap-y-1 flex-wrap">
        <NuxtLink :to="'/essay/' + item.id">
          <span
            class="text-lg font-bold hover:text-blue-500 transition-all duration-200 line-clamp-1"
          >
            {{ item.name }}
          </span>
        </NuxtLink>

        <div class="text-sm text-gray-500 line-clamp-1">
          {{ item.introduction }}
        </div>

        <div
          class="flex flex-wrap items-center line-clamp-1 md:line-clamp-2 lg:line-clamp-3"
        >
          <el-tag type="primary">
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
            class="inline-block m-1"
          >
            {{ label }}
          </el-tag>
        </div>

        <small class="flex justify-between text-xs text-gray-400">
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
