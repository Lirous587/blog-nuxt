<template>
  <div class="mx-3 my-3">
    <el-card>
      <template #header>
        <div class="flex gap-x-2">
          <MyButton type="primary" @click="drawerRef.open()" class="ml-3"
            >添加文章</MyButton
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
  kindID: 0,
  labelIds: [],
  introduction: "",
  content: "",
  ifTop: false,
  ifRecommend: false,
  keywords: "",
  img: {
    url: "",
    id: "",
  },
  previewTheme: "",
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
