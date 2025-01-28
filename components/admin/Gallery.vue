<template>
  <el-card>
    <template #header>
      <div v-if="asideRef && mainRef">
        <AdminSearch @search="getData" @reset="mainRef.resetSearchForm">
          <template #default>
            <el-input
              placeholder="请输入关键词"
              v-model="mainRef.searchForm.keyword"
              @keydown.enter="mainRef.getData"
            ></el-input>
          </template>
        </AdminSearch>
        <div>
          <el-button type="primary" size="small" @click="asideRef.handleCreate"
            >创建分类</el-button
          >
          <el-button type="success" size="small" @click="mainRef.handleCreate"
            >上传图片</el-button
          >
        </div>
      </div>
    </template>

    <el-container class="h-[600px]">
      <el-aside width="180px" class="border dark:border-gray-600">
        <AdminGalleryAside ref="asideRef" @change="handleChangeKind" />
      </el-aside>
      <div class="flex-1 pr-5 border dark:border-gray-600">
        <AdminGalleryMain
          @select="handleSelectImg"
          ref="mainRef"
          :kindID="kindID"
          :oID="props.oID"
        ></AdminGalleryMain>
      </div>
    </el-container>
  </el-card>

  <!-- <el-form :model="galleryForm">
          <el-form-item>
            <UploadImg v-model:imgData="galleryForm.imgData">
              <template #default>
                <div
                  class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </template>
              <template #preview="previewProps">
                <div
                  class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
                >
                  <el-image
                    v-if="previewProps.previewUrl"
                    :src="previewProps.previewUrl"
                  />
                  <el-icon v-else><Plus /></el-icon>
                </div>
              </template>
            </UploadImg>
          </el-form-item>
          <el-form-item>
            <el-button class="mt-3" type="primary" @click="handleUpload">
              上传图片
            </el-button>
          </el-form-item>
        </el-form> -->
</template>

<script setup>
const asideRef = ref(null);
const mainRef = ref(null);

const props = defineProps({
  oID: {
    type: Number,
    default: 0,
  },
});

const kindID = ref(1);

const handleChangeKind = (id) => {
  kindID.value = id;
};

const emits = defineEmits(["select"]);

const handleSelectImg = (img) => {
  emits("select", img);
};
</script>
