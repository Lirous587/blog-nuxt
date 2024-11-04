<template>
  <div
    class="h-[200px] border border-dotted rounded-md flex items-center justify-center cursor-pointer"
  >
    <el-image
      v-if="props.imgUrl"
      :src="imgPre + imgUrl"
      class="h-full"
    ></el-image>
    <el-icon size="30" v-else>
      <Plus />
    </el-icon>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const imgPre = config.public.imgBase + "/";

const props = defineProps({
  imgUrl: {
    type: String,
    require: true,
  },
});
</script>
