<template>
  <el-card shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">推荐文章</span>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="item in list">
        <NuxtLink
          :key="item.id"
          :to="'/essay/' + item.id"
          class="flex items-center justify-between"
        >
          <div class="flex flex-col w-full">
            <div class="flex items-center w-full">
              <el-image
                :src="imgUrlPre + '/' + item.imgUrl"
                fit="cover"
                lazy
                class="w-[80px] h-[45px] rounded-lg flex-shrink-0"
              ></el-image>
              <div class="ml-5 text-sm text-pink-400 truncate">
                {{ item.name }}
              </div>
            </div>
            <small class="text-xs my-1 text-gray-300">
              {{ formateDate(item.createdTime) }}
            </small>
          </div>
        </NuxtLink>
        <div class="h-[1px] bg-pink-100 border-dotted"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const imgUrlPre = useRuntimeConfig().public.imgBase;
// const imgUrlArr = ref(["https://liuzihao.online:8080/api/img/6.png"]);
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
