<template>
  <div
    class="h-[200px] w-[200px] border border-dotted rounded-md flex items-center justify-center cursor-pointer p-3 shadow-md hover:scale-105 transition-transform duration-300"
  >
    <el-image
      v-if="props.imgUrl"
      :src="imgPre + imgUrl"
      class="h-full"
      fit="cover"
    ></el-image>
    <el-icon size="30" v-else>
      <Plus />
    </el-icon>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase + "/";

const props = defineProps({
  imgUrl: {
    type: String,
    require: true,
  },
});
</script>
