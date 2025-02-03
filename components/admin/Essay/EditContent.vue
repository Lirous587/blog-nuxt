<template>
  <el-card>
    <template #header>
      <AdminEssayInsertImg
        @choose-galley="chooseGalleyhandle"
      ></AdminEssayInsertImg>
    </template>
    <MdEdit
      ref="mdEditRef"
      v-model:content="content"
      :code-theme="theme"
    ></MdEdit>
  </el-card>
</template>

<script setup>
import { getEssay } from "~/api/essay";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
  },
});

const content = defineModel("content", {
  type: String,
  required: true,
});

provide("select", true);

const mdEditRef = ref(null);

const chooseGalleyhandle = (imgUrl) => {
  const insertValue = `\n![图片信息](${imgUrl})\n`;
  mdEditRef.value.editorRef.insert(() => {
    return {
      targetValue: insertValue,
      select: false,
      deviationStart: 0,
      deviationEnd: 0,
    };
  });
};

onMounted(() => {
  if (props.id) {
    getEssay(props.id).then((res) => {
      const data = res.data;
      content.value = data.content;
    });
  }
});
</script>
