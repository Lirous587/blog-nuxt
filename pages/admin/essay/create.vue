<template>
  <div class="mx-3 my-3">
    <el-card>
      <template #header>
        <div class="flex gap-x-2">
          <el-button type="primary" @click="drawerRef.open()" class="ml-3"
            >添加文章</el-button
          >
          <AdminEssayInsertImg
            @choose-galley="chooseGalleyHandel"
          ></AdminEssayInsertImg>
        </div>
      </template>
      <MdEdit ref="mdEditRef" v-model:content="form.content"></MdEdit>
    </el-card>
    <AdminEssayDrawer
      v-model:form="form"
      title="添加文章"
      ref="drawerRef"
      opration="create"
    ></AdminEssayDrawer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

provide("select", true);

const form = reactive({
  name: "",
  kind_id: 0,
  label_ids: [],
  introduction: "",
  content: "",
  if_top: false,
  if_recommend: false,
  keywords: [],
  img: {
    url: "",
    id: "",
  },
});

const drawerRef = ref(null);

const mdEditRef = ref(null);

const chooseGalleyHandel = (imgUrl) => {
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
</script>
