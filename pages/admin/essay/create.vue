<template>
  <div class="mx-3 my-3">
    <el-card>
      <template #header>
        <div class="flex gap-x-2">
          <el-button type="primary" @click="drawerVisiable = true" class="ml-3"
            >添加文章</el-button
          >
          <AdminEssayInsertImg
            @choose-galley="chooseGalleyHandel"
          ></AdminEssayInsertImg>
        </div>
      </template>
      <MdEdit v-model:content="form.content"></MdEdit>
    </el-card>
    <AdminEssayDrawer
      v-model:drawerVisiable="drawerVisiable"
      v-model:form="form"
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
  kindID: null,
  labelIds: [],
  introduction: "",
  content: "",
  ifTop: false,
  ifRecommend: false,
  keywords: [],
  img: {
    url: "",
    id: "",
  },
});

const drawerVisiable = ref(false);

const chooseGalleyHandel = (imgUrl) => {
  form.content += `\n![图片信息](${imgUrl})\n`;
};
</script>
