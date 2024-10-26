<template>
  <el-card
    v-for="item in list"
    :key="item.id"
    shadow="always"
    class="!rounded-xl mx-10 my-8 hover:!shadow-lg bg-gradient-to-br from-pink-50 to-green-100"
  >
    <div class="flex items-center">
      <NuxtLink
        :to="'/essay/' + item.id"
        class="flex items-center justify-center w-[128px] h-[72px] md:w-[160px] md:h-[70px] lg:w-[208px] lg:h-[117px] bg-cyan-100"
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

        <div class="flex flex-wrap items-center">
          <span class="line-clamp-1 md:line-clamp-2 lg:line-clamp-3">
            <el-tag type="primary">
              <NuxtLink :to="'/kind/' + item.kindID + '/1'">
                <div class="flex items-center text-xs">
                  <el-icon><Menu /></el-icon>
                  <span>
                    {{ item.kindName }}
                  </span>
                </div>
              </NuxtLink>
            </el-tag>
            <el-tag type="info" class="mx-1" v-for="label in item.labelList">
              <NuxtLink
                class="line-clamp-1 md:line-clamp-2 lg:line-clamp-3"
                :to="'/label/' + label.id + '/1'"
              >
                {{ label.name }}
              </NuxtLink>
            </el-tag>
          </span>
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

<style scoped>
* {
  font-family: "myFont";
}
</style>
